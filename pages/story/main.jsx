import './main.scss';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_STORY_ALL } from '../../entities/story/actions/storyActions';
import apolloClient from '../../app/graphql/apollo-client';
import { useSafeTranslation } from '../../shared/hooks/useSafeTranslation';
import { filterByLanguage } from '../../shared/utils/language-filter';
import LeftLayout from '../../app/layouts/LeftLayout';
import Breadcrumbs from '../../shared/breadcrumbs-page/BreadcrumbsPage';
import Link from 'next/link';
import Image from 'next/image';
import Pagination from '../../shared/paginagion/Pagination';
import { cleanHtmlFull } from '../../shared/utils/utils-content';
import { removeLanguageSuffix } from '../../shared/utils/utils-url';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const POSTS_PER_PAGE = 12;

const StoryMainPage = ({ initialData }) => {
    const { t } = useSafeTranslation('common');
    const router = useRouter();
    const { locale } = router;
    const [currentPage, setCurrentPage] = useState(1);

    // Сбрасываем страницу на 1 при смене языка
    useEffect(() => {
        setCurrentPage(1);
    }, [locale]);

    // Прокрутка наверх при смене страницы
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const { loading, error, data } = useQuery(GET_STORY_ALL, {
        fetchPolicy: 'cache-and-network',
    });

    // ISR loading state or data loading
    if (router.isFallback || loading) {
        return (
            <LeftLayout>
                <div style={{ padding: '60px 0', textAlign: 'center' }}>
                    <h1>Loading...</h1>
                </div>
            </LeftLayout>
        );
    }

    const allStories = data?.stories?.edges || initialData?.stories?.edges || [];
    
    // Отладочная информация
    console.log('StoryMain - Total stories loaded:', allStories.length);
    console.log('StoryMain - Current locale:', locale);
    
    // Показываем распределение постов по языкам
    const langStats = {};
    allStories.forEach(s => {
        const lang = s.node.language?.code || s.node.language?.locale || 'unknown';
        langStats[lang] = (langStats[lang] || 0) + 1;
    });
    console.log('StoryMain - Stories by language:', langStats);
    
    // Фильтруем истории по текущему языку
    let filteredStories = filterByLanguage(allStories, locale);
    
    console.log('StoryMain - Filtered for locale', locale, ':', filteredStories.length);
    
    // Если после фильтрации нет историй, показываем все истории (fallback)
    if (filteredStories.length === 0) {
        console.warn('⚠️ StoryMain - No stories found for locale', locale, ', showing all stories as fallback');
        filteredStories = allStories;
    }

    // Сортируем истории по дате (если есть date поле, иначе просто оставляем как есть)
    const sortedStories = [...filteredStories];

    // Пагинация
    const totalPages = Math.ceil(sortedStories.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentStories = sortedStories.slice(startIndex, endIndex);

    const getLocalizedUrl = (slug) => {
        // Удаляем существующий языковой суффикс из slug (если есть)
        const cleanSlug = removeLanguageSuffix(slug);
        
        if (locale === 'en') {
            return `/story/${cleanSlug}`;
        }
        return `/story/${cleanSlug}-${locale}`;
    };

    // Determine text direction based on locale
    const isRTL = locale === 'he' || locale === 'ar';
    const dir = isRTL ? 'rtl' : 'ltr';

    const PageProps = {
        title: t('storyMain.seoTitle') || 'Success Stories',
        description: t('storyMain.seoDescription') || 'Read success stories from our patients'
    };

    // Breadcrumbs data
    const breadcrumbsMaterial = {
        title: t('storyMain.title') || 'Success Stories',
        slug: 'main'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="story-main" dir={dir}>
                <div className="container">
                    <h1 className="story-main__title">{t('storyMain.title') || 'Success Stories'}</h1>
                    <Breadcrumbs material={breadcrumbsMaterial} typeMaterial="story" />
                    
                    {error && (
                        <div className="story-main__error">
                            <p>Error loading stories: {error.message}</p>
                        </div>
                    )}

                    {currentStories.length === 0 ? (
                        <div className="story-main__empty">
                            <p>{t('storyMain.noPosts') || 'No stories available'}</p>
                        </div>
                    ) : (
                        <>
                            <div className="story-main__grid">
                                {currentStories.map((item) => {
                                    const story = item.node;
                                    return (
                                        <Link
                                            key={story.id}
                                            href={getLocalizedUrl(story.slug)}
                                            className="story-main__card"
                                        >
                                            <div className="story-main__card-image">
                                                {story?.AcfStory?.imageAnons?.sourceUrl ? (
                                                    <Image
                                                        src={story.AcfStory.imageAnons.sourceUrl}
                                                        alt={cleanHtmlFull(story?.AcfStory?.titleLong || story.title)}
                                                        width={400}
                                                        height={300}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : story?.featuredImage?.node?.sourceUrl ? (
                                                    <Image
                                                        src={story.featuredImage.node.sourceUrl}
                                                        alt={cleanHtmlFull(story?.AcfStory?.titleLong || story.title)}
                                                        width={400}
                                                        height={300}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div className="story-main__card-placeholder">
                                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="#A43A4E"/>
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="story-main__card-content">
                                                <h3 className="story-main__card-title">
                                                    {cleanHtmlFull(story?.AcfStory?.titleShort || story.title)}
                                                </h3>
                                                {story?.AcfStory?.descriptionAnons && (
                                                    <div className="story-main__card-excerpt">
                                                        {cleanHtmlFull(story.AcfStory.descriptionAnons).substring(0, 150)}...
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {totalPages > 1 && (
                                <div className="story-main__pagination">
                                    <Pagination
                                        totalPages={totalPages}
                                        currentPage={currentPage}
                                        setPageNumber={setCurrentPage}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </LeftLayout>
    );
};

export async function getStaticProps({ locale }) {
    try {
        const { data } = await apolloClient.query({
            query: GET_STORY_ALL,
        });

        return {
            props: {
                initialData: data || {
                    stories: { edges: [] }
                },
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 3600, // Revalidate every hour
        };
    } catch (error) {
        console.error('Error fetching stories:', error);
        return {
            props: {
                initialData: { stories: { edges: [] } },
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 3600,
        };
    }
}

export default StoryMainPage;

