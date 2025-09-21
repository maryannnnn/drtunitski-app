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
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../shared/breadcrumbs-page/BreadcrumbsPage";
import {storyOptions} from "../../app/info/info";
import { useTranslation } from 'next-i18next';
import { filterByLanguage } from '../../shared/utils/language-filter';
import VideoDisplay from '../../shared/video-display/VideoDisplay';

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";

const StoryPage = ({initialData}) => {
    const { t } = useTranslation();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const router = useRouter();
    const {slug, locale} = router.query;

    console.log("Slug data: ", slug);

    const {loading, error, data} = useQuery(GET_STORY_BY_SLUG, {
        variables: {slug},
        skip: !slug,
        fetchPolicy: 'cache-and-network',
    });

    if (router.isFallback || loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    if (!isClient) {
        return <div>Loading...</div>;
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
                            <div className="story__personal">
                                <div
                                    className="story__personal-name">{cleanHtmlFull(story?.AcfStory?.groupInfoPost?.fullName)}
                                </div>
                                {/*{story?.AcfStory?.groupInfoPost?.speciality && (*/}
                                {/*    <div className="story__personal-name">*/}
                                {/*        {cleanHtmlFull(story.AcfStory.groupInfoPost.speciality)}*/}
                                {/*    </div>*/}
                                {/*)}*/}
                            </div>
                            <div className="story__anons">
                                <div className="story__anons-img">
                                    {story?.AcfStory?.imageAnons?.sourceUrl ? (
                                        <LightGallery
                                            elementClassNames={'masonry-gallery-demo'}
                                            plugins={[lgZoom, lgShare, lgHash]}
                                            speed={500}
                                        >
                                            <a href={story?.AcfStory?.imageAnons?.sourceUrl}>
                                                <Image
                                                    src={story.AcfStory.imageAnons.sourceUrl}
                                                    alt={cleanHtmlFull(story?.AcfStory?.titleLong || '')}
                                                    width={500}
                                                    height={400}
                                                    layout="intrinsic"
                                                />
                                            </a>
                                        </LightGallery>
                                    ) : story?.AcfStory?.groupInfoPost?.imageAuthor?.sourceUrl ? (
                                        <LightGallery
                                            elementClassNames={'masonry-gallery-demo'}
                                            plugins={[lgZoom, lgShare, lgHash]}
                                            speed={500}
                                        >
                                            <a href={story.AcfStory.groupInfoPost.imageAuthor.sourceUrl}>
                                                <Image
                                                    src={story.AcfStory.groupInfoPost.imageAuthor.sourceUrl}
                                                    alt={cleanHtmlFull(story?.AcfStory?.titleLong || '')}
                                                    width={150}
                                                    height={150}
                                                    layout="intrinsic"
                                                />
                                            </a>
                                        </LightGallery>
                                    ) : null}
                                </div>
                                <div className="story__anons-text"
                                     dangerouslySetInnerHTML={{__html: story?.AcfStory?.descriptionAnons || ''}}>
                                </div>
                            </div>
                            {story?.content && (
                                <div className="story-block-center">
                                    <div className="container">
                                        <h2 className="story__title-main">{cleanHtmlFull(story?.AcfStory?.titleCenter)}</h2>
                                        <div className="story__description">
                                            {story?.AcfStory?.imageAnons && (
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
                                                                width={500}
                                                                height={400}
                                                                layout="intrinsic"
                                                            />
                                                        </a>
                                                    </LightGallery>
                                                </div>
                                            )}
                                            <div className="story__description-text"
                                                 dangerouslySetInnerHTML={{__html: story?.content}}>
                                            </div>
                                        </div>
                                    </div>
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
                                    <div className="story__video-text"
                                         dangerouslySetInnerHTML={{__html: story?.AcfStory?.videoDescription}}>
                                    </div>
                                </div>
                            )}
                            {story?.AcfStory?.faqContent && (
                                <div className="story-block-bottom">
                                    <div className="container">
                                        <h2 className="story__title-faq">{cleanHtmlFull(story?.AcfStory?.faqTitle)}</h2>
                                        <div className="story__faq">
                                            <div className="story__faq-content"
                                                 dangerouslySetInnerHTML={{__html: story?.AcfStory?.faqContent}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </LeftLayout>
    );
};

export async function getStaticPaths({ locales }) {
    try {
        const {data} = await apolloClient.query({
            query: GET_STORY_ALL,
        });

        console.log("Fetched stories data: ", data);

        const paths = [];
        
        // Generate paths for each locale
        locales.forEach(locale => {
            const filteredStories = filterByLanguage(data.stories.edges, locale);
            filteredStories.forEach(item => {
                paths.push({
                    params: { slug: item.node.slug },
                    locale: locale
                });
            });
        });

        console.log("Generated paths: ", paths);

        return {paths, fallback: true};
    } catch (error) {
        console.error("Error fetching storys for static paths:", error);
        return {
            paths: [],
            fallback: true
        };
    }
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
            //revalidate: 2592000, // Revalidate every 30 days
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
        };
    }
}

export default StoryPage;




