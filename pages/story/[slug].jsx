import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import {useQuery} from "@apollo/client";
import {GET_STORY_BY_SLUG, GET_STORY_ALL} from "../../entities/story/actions/storyActions";
import apolloClient from "../../app/graphql/apollo-client";
import React, {useEffect, useState} from "react";
import LeftLayout from "../../app/layouts/LeftLayout";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import Image from "next/image";
import Breadcrumbs from "../../shared/breadcrumbs-page/BreadcrumbsPage";
import { useSafeTranslation } from '../../shared/hooks/useSafeTranslation';
import { filterByLanguage } from '../../shared/utils/language-filter';
import VideoDisplay from '../../shared/video-display/VideoDisplay';
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Modal from '../../shared/modal/Modal';
import ContactUsBlock from '../../shared/contact-us-block/ContactUsBlock';
import WordPressContent from '../../components/WordPressContent'; // ← ИМПОРТ

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";
import MainConsultation from "../../widgets/main-consultation";
import MedreviewsBlock from "../../shared/medreviews-block/MedreviewsBlock";

const StoryPage = ({initialData}) => {
    const { t } = useSafeTranslation();
    const [isModalActive, setIsModalActive] = useState(false);

    const router = useRouter();
    const {slug, locale} = router.query;

    // Only log slug when it's available (not during build)
    if (slug) {
        console.log("Slug data: ", slug);
    }

    const {loading, error, data} = useQuery(GET_STORY_BY_SLUG, {
        variables: {slug},
        skip: !slug,
        fetchPolicy: 'cache-and-network',
    });

    // Show loading state while page is being generated (ISR fallback) or data loading
    if (router.isFallback || loading) {
        return (
            <LeftLayout>
                <div style={{padding: '60px 0', textAlign: 'center'}}>
                    <h1>Loading...</h1>
                </div>
            </LeftLayout>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    const story = data?.storyBy || initialData?.storyBy;

    const typeMaterial = "story"

    const PageProps = {
        title: story?.seo?.title || t('common:navigation.home'),
        description: story?.seo?.metaDesc || t('common:navigation.home')
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="story">
                <div className="container">
                    {error ? (
                        <Stack sx={{width: '100%'}} spacing={2}>
                            <Alert severity="error">
                                {error.graphQLErrors ? error.graphQLErrors.map((err, index) => (
                                    <div key={index}>{err.message}</div>
                                )) : 'An error occurred'}
                            </Alert>
                        </Stack>
                    ) : (
                        <>
                            <h1 className="story__title">{cleanHtmlFull(story?.AcfStory?.titleLong)}</h1>
                            <Breadcrumbs material={story} typeMaterial={typeMaterial}/>

                            {/* Категории 2-го и 3-го уровня */}
                            {story?.trees?.edges && story.trees.edges.length > 0 && (() => {
                                // Фильтруем категории по уровню (считаем слеши в URI)
                                const categoriesLevel2And3 = story.trees.edges
                                    .filter(tree => {
                                        const uri = tree.node.uri || '';
                                        // Убираем начальный и конечный слеши и считаем оставшиеся
                                        const cleanUri = uri.replace(/^\/|\/$/g, '');
                                        const slashCount = (cleanUri.match(/\//g) || []).length;
                                        // Уровень 2: 1 слеш, Уровень 3: 2 слеша
                                        return slashCount === 1 || slashCount === 2;
                                    })
                                    .map(tree => tree.node.name);

                                // Убираем дубликаты
                                const uniqueCategories = [...new Set(categoriesLevel2And3)];

                                return uniqueCategories.length > 0 ? (
                                    <div className="story__categories">
                                        {uniqueCategories.join(' • ')}
                                    </div>
                                ) : null;
                            })()}

                            {/*<div className="story__personal">*/}
                            {/*    <div*/}
                            {/*        className="story__personal-name">{cleanHtmlFull(story?.AcfStory?.groupInfoPost?.fullName)}*/}
                            {/*    </div>*/}
                            {/*</div>*/}
                            <div className="story__anons">
                                {story?.AcfStory?.imageAnons && (
                                    <div className="story__anons-img">
                                        <LightGallery
                                            elementClassNames={'masonry-gallery-demo'}
                                            plugins={[lgZoom, lgShare, lgHash]}
                                            speed={500}
                                        >
                                            <a href={story?.AcfStory?.imageAnons?.sourceUrl}>
                                                <Image
                                                    src={story.AcfStory.imageAnons.sourceUrl}
                                                    alt={cleanHtmlFull(story?.AcfStory?.titleLong || '')}
                                                    width={400}
                                                    height={400}
                                                    layout="intrinsic"
                                                />
                                            </a>
                                        </LightGallery>
                                    </div>
                                )}
                                {/* ЗАМЕНА: dangerouslySetInnerHTML → WordPressContent */}
                                <WordPressContent
                                    content={story?.AcfStory?.descriptionAnons}
                                    className="story__anons-text"
                                />
                            </div>
                            <div className="story__appointment-btn">
                                <ButtonBrown
                                    onClick={() => setIsModalActive(true)}
                                    className="story__appointment-button"
                                >
                                    {t('common:buttons.bookAppointment')}
                                </ButtonBrown>
                            </div>
                            <MainConsultation />
                            <MedreviewsBlock />
                            {story?.content && (
                                <div className="story-block-center">
                                    <div className="container">
                                        <h2 className="story__title-main">{cleanHtmlFull(story?.AcfStory?.titleCenter)}</h2>
                                        <div className="story__description">
                                            {story?.featuredImage?.node?.sourceUrl && (
                                                <div className="story__description-img">
                                                    <LightGallery
                                                        elementClassNames={'masonry-gallery-demo'}
                                                        plugins={[lgZoom, lgShare, lgHash]}
                                                        speed={500}
                                                    >
                                                        <a href={story?.featuredImage?.node?.sourceUrl}>
                                                            <Image
                                                                src={story?.featuredImage?.node?.sourceUrl}
                                                                alt={cleanHtmlFull(story?.AcfStory?.titleCenter || '')}
                                                                width={400}
                                                                height={400}
                                                                layout="intrinsic"
                                                            />
                                                        </a>
                                                    </LightGallery>
                                                </div>
                                            )}
                                            {/* ЗАМЕНА: dangerouslySetInnerHTML → WordPressContent */}
                                            <WordPressContent
                                                content={story?.content}
                                                className="story__description-text"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                            {story?.content && (
                                <div className="story__appointment-btn">
                                    <ButtonBrown
                                        onClick={() => setIsModalActive(true)}
                                        className="story__appointment-button"
                                    >
                                        {t('common:buttons.bookAppointment')}
                                    </ButtonBrown>
                                </div>
                            )}
                            {story?.AcfStory?.video && (
                                <div className="story__video">
                                    <h2 className="story__title-video">{cleanHtmlFull(story?.AcfStory?.videoTitle)}</h2>
                                    <div className="story__video-content">
                                        <VideoDisplay
                                            videoUrl={story?.AcfStory?.video}
                                            title={cleanHtmlFull(story?.AcfStory?.videoTitle)}
                                            style={{ width: '500px', height: '281px' }}
                                            mobileStyle={{ width: '370px', height: '208px' }}
                                        />
                                    </div>
                                    {/* ЗАМЕНА: dangerouslySetInnerHTML → WordPressContent */}
                                    <WordPressContent
                                        content={story?.AcfStory?.videoDescription}
                                        className="story__video-text"
                                    />
                                </div>
                            )}
                            {story?.AcfStory?.video && (
                                <div className="story__appointment-btn">
                                    <ButtonBrown
                                        onClick={() => setIsModalActive(true)}
                                        className="story__appointment-button"
                                    >
                                        {t('common:buttons.bookAppointment')}
                                    </ButtonBrown>
                                </div>
                            )}
                            {story?.AcfStory?.faqContent && (
                                <div className="story-block-bottom">
                                    <div className="container">
                                        <h2 className="story__title-faq">{cleanHtmlFull(story?.AcfStory?.faqTitle)}</h2>
                                        <div className="story__faq">
                                            {/* ЗАМЕНА: dangerouslySetInnerHTML → WordPressContent */}
                                            <WordPressContent
                                                content={story?.AcfStory?.faqContent}
                                                className="story__faq-content"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Modal
                active={isModalActive}
                setActive={setIsModalActive}
                title={t('common:buttons.bookAppointment')}
            />
        </LeftLayout>
    );
};

export async function getStaticPaths({ locales }) {
    // ISR FIX: Skip GraphQL during build - pages generated on-demand
    console.log("⚠️ ISR enabled: pages will be generated on first request");

    return {
        paths: [],
        fallback: true // Pages generated on-demand, then cached
    };
}

export async function getStaticProps({params, locale}) {
    try {
        const {data} = await apolloClient.query({
            query: GET_STORY_BY_SLUG,
            variables: {slug: params.slug},
        });

        return {
            props: {
                initialData: data || {
                    storyBy: null
                },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) =>
                    serverSideTranslations(locale, ['common'])
                )),
            },
            revalidate: 86400, // 24 hours - page regenerated daily
        };
    } catch (error) {
        console.error("Error fetching story:", error);
        return {
            props: {
                initialData: { storyBy: null },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) =>
                    serverSideTranslations(locale, ['common'])
                )),
            },
            revalidate: 3600, // 1 hour - retry faster on error
        };
    }
}

export default StoryPage;




