import './blog.scss';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import { GET_MEDIA_ALL } from '../../entities/media/actions/mediaActions';
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

const MediaExpertPage = ({ initialData }) => {
    const { t } = useSafeTranslation('common');
    const router = useRouter();
    const { locale } = router;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setCurrentPage(1);
    }, [locale]);

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage]);

    const { loading, error, data } = useQuery(GET_MEDIA_ALL, {
        fetchPolicy: 'cache-and-network',
    });

    if (router.isFallback || loading) {
        return (
            <LeftLayout>
                <div style={{ padding: '60px 0', textAlign: 'center' }}>
                    <h1>Loading...</h1>
                </div>
            </LeftLayout>
        );
    }

    const allMedias = data?.medias?.edges || initialData?.medias?.edges || [];
    const pageInfo = data?.medias?.pageInfo || initialData?.medias?.pageInfo;
    
    console.log('MediaExpert - Total medias loaded:', allMedias.length);
    console.log('MediaExpert - Current locale:', locale);
    
    let filteredMedias = filterByLanguage(allMedias, locale);
    
    console.log('MediaExpert - Filtered for locale', locale, ':', filteredMedias.length);
    
    if (filteredMedias.length === 0) {
        console.warn('⚠️ MediaExpert - No posts found for locale', locale, ', showing all posts as fallback');
        filteredMedias = allMedias;
    }
    
    // 🎯 ФИЛЬТРУЕМ ТОЛЬКО ЭКСПЕРТ
    filteredMedias = filteredMedias.filter(item => {
        const trees = item.node.trees?.edges || [];
        return trees.some(tree => 
            tree.node.name && tree.node.name.toLowerCase().includes('expert')
        );
    });
    
    console.log('MediaExpert - After expert filter:', filteredMedias.length);

    const sortedMedias = [...filteredMedias].sort((a, b) => {
        const dateA = new Date(a.node.date);
        const dateB = new Date(b.node.date);
        return dateB - dateA;
    });

    const totalPages = Math.ceil(sortedMedias.length / POSTS_PER_PAGE);
    const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
    const endIndex = startIndex + POSTS_PER_PAGE;
    const currentMedias = sortedMedias.slice(startIndex, endIndex);

    const getLocalizedUrl = (slug) => {
        const cleanSlug = removeLanguageSuffix(slug);
        
        if (locale === 'en') {
            return `/media/${cleanSlug}`;
        }
        return `/media/${cleanSlug}-${locale}`;
    };

    const isRTL = locale === 'he' || locale === 'ar';
    const dir = isRTL ? 'rtl' : 'ltr';

    const PageProps = {
        title: t('mediaExpert.seoTitle') || 'Expert Opinion',
        description: t('mediaExpert.seoDescription') || 'Professional medical insights from experts'
    };

    const breadcrumbsMaterial = {
        title: t('mediaExpert.title') || 'Expert Opinion',
        slug: 'expert'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="media-blog" dir={dir}>
                <div className="container">
                    <h1 className="media-blog__title">{t('mediaExpert.title') || 'Expert Opinion'}</h1>
                    <Breadcrumbs material={breadcrumbsMaterial} typeMaterial="media" />
                    
                    {pageInfo?.hasNextPage && (
                        <div className="media-blog__warning" style={{ 
                            padding: '15px', 
                            marginBottom: '20px', 
                            backgroundColor: '#fff3cd', 
                            border: '1px solid #ffc107',
                            borderRadius: '8px',
                            color: '#856404'
                        }}>
                            <p style={{ margin: 0 }}>
                                ⚠️ Warning: Not all posts are loaded. There are more posts available in WordPress. 
                                Loaded: {allMedias.length} posts.
                            </p>
                        </div>
                    )}
                    
                    {error && (
                        <div className="media-blog__error">
                            <p>Error loading expert posts: {error.message}</p>
                        </div>
                    )}

                    {currentMedias.length === 0 ? (
                        <div className="media-blog__empty">
                            <p>{t('mediaExpert.noPosts') || 'No expert posts available'}</p>
                        </div>
                    ) : (
                        <>
                            <div className="media-blog__grid">
                                {currentMedias.map((item) => {
                                    const media = item.node;
                                    return (
                                        <Link
                                            key={media.id}
                                            href={getLocalizedUrl(media.slug)}
                                            className="media-blog__card"
                                        >
                                            <div className="media-blog__card-image">
                                                {media?.AcfMedia?.imageAnons?.sourceUrl ? (
                                                    <Image
                                                        src={media.AcfMedia.imageAnons.sourceUrl}
                                                        alt={cleanHtmlFull(media?.AcfMedia?.titleLong || media.title)}
                                                        width={400}
                                                        height={300}
                                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                                    />
                                                ) : (
                                                    <div className="media-blog__card-placeholder">
                                                        <svg width="60" height="60" viewBox="0 0 24 24" fill="none">
                                                            <path d="M8 5V19L19 12L8 5Z" fill="#A43A4E"/>
                                                        </svg>
                                                    </div>
                                                )}
                                                {media?.AcfMedia?.video && (
                                                    <div className="media-blog__play-overlay">
                                                        <div className="media-blog__play-button">
                                                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                                                                <path d="M8 5V19L19 12L8 5Z" fill="#A43A4E"/>
                                                            </svg>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="media-blog__card-content">
                                                <h3 className="media-blog__card-title">
                                                    {cleanHtmlFull(media?.AcfMedia?.titleLong || media.title)}
                                                </h3>
                                                {media?.AcfMedia?.descriptionAnons && (
                                                    <div className="media-blog__card-excerpt">
                                                        {cleanHtmlFull(media.AcfMedia.descriptionAnons).substring(0, 150)}...
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>

                            {totalPages > 1 && (
                                <div className="media-blog__pagination">
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
            query: GET_MEDIA_ALL,
        });

        return {
            props: {
                initialData: data || {
                    medias: { edges: [] }
                },
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 3600,
        };
    } catch (error) {
        console.error('Error fetching expert posts:', error);
        return {
            props: {
                initialData: { medias: { edges: [] } },
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 3600,
        };
    }
}

export default MediaExpertPage;

