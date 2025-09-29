import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import {useQuery} from "@apollo/client";
import {GET_MEDIA_BY_SLUG, GET_MEDIA_ALL} from "../../entities/media/actions/mediaActions";
import apolloClient from "../../app/graphql/apollo-client";
import React, {useEffect, useState} from "react";
import LeftLayout from "../../app/layouts/LeftLayout";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import Image from "next/image";
import Breadcrumbs from "../../shared/breadcrumbs-page/BreadcrumbsPage";
import { useTranslation } from 'next-i18next';
import { filterByLanguage } from '../../shared/utils/language-filter';
import VideoDisplay from '../../shared/video-display/VideoDisplay';
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Modal from '../../shared/modal/Modal';

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";

const MediaPage = ({initialData}) => {
    const { t } = useTranslation();
    const [isClient, setIsClient] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const router = useRouter();
    const {slug, locale} = router.query;

    // Only log slug when it's available (not during build)
    if (slug) {
        console.log("Slug data: ", slug);
    }

    const {loading, error, data} = useQuery(GET_MEDIA_BY_SLUG, {
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

    const media = data?.mediaBy || initialData?.mediaBy;

    const typeMaterial = "media"

    const PageProps = {
        title: media?.seo?.title || t('common:navigation.home'),
        description: media?.seo?.metaDesc || t('common:navigation.home')
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="media">
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
                            <h1 className="media__title">{cleanHtmlFull(media?.AcfMedia?.titleLong)}</h1>
                            <Breadcrumbs material={media} typeMaterial={typeMaterial}/>
                            <div className="media__personal">
                                <div
                                    className="media__personal-name">{cleanHtmlFull(media?.AcfMedia?.groupInfoPost?.fullName)}
                                </div>
                            </div>
                            <div className="media__anons">
                                {media?.AcfMedia?.imageAnons && (
                                    <div className="media__anons-img">
                                        <LightGallery
                                            elementClassNames={'masonry-gallery-demo'}
                                            plugins={[lgZoom, lgShare, lgHash]}
                                            speed={500}
                                        >
                                            <a href={media?.AcfMedia?.imageAnons?.sourceUrl}>
                                                <Image
                                                    src={media.AcfMedia.imageAnons.sourceUrl}
                                                    alt={cleanHtmlFull(media?.AcfMedia?.titleLong || '')}
                                                    width={400}
                                                    height={400}
                                                    layout="intrinsic"
                                                />
                                            </a>
                                        </LightGallery>
                                    </div>
                                )}
                                <div className="media__anons-text"
                                     dangerouslySetInnerHTML={{__html: media?.AcfMedia?.descriptionAnons || ''}}>
                                </div>
                            </div>
                            <div className="media__appointment-btn">
                                <ButtonBrown
                                    onClick={() => setIsModalActive(true)}
                                    className="media__appointment-button"
                                >
                                    {t('common:buttons.bookAppointment')}
                                </ButtonBrown>
                            </div>
                            {media?.content && (
                                <div className="media-block-center">
                                    <div className="container">
                                        <h2 className="media__title-main">{cleanHtmlFull(media?.AcfMedia?.titleCenter)}</h2>
                                        <div className="media__description">
                                            {media?.featuredImage?.node?.sourceUrl && (
                                                <div className="media__description-img">
                                                    <LightGallery
                                                        elementClassNames={'masonry-gallery-demo'}
                                                        plugins={[lgZoom, lgShare, lgHash]}
                                                        speed={500}
                                                    >
                                                        <a href={media?.featuredImage?.node?.sourceUrl}>
                                                            <Image
                                                                src={media?.featuredImage?.node?.sourceUrl}
                                                                alt={cleanHtmlFull(media?.AcfMedia?.titleCenter || '')}
                                                                width={400}
                                                                height={400}
                                                                layout="intrinsic"
                                                            />
                                                        </a>
                                                    </LightGallery>
                                                </div>
                                            )}
                                            <div className="media__description-text"
                                                 dangerouslySetInnerHTML={{__html: media?.content}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {media?.content && (
                                <div className="media__appointment-btn">
                                    <ButtonBrown
                                        onClick={() => setIsModalActive(true)}
                                        className="media__appointment-button"
                                    >
                                        {t('common:buttons.bookAppointment')}
                                    </ButtonBrown>
                                </div>
                            )}
                            {media?.AcfMedia?.video && (
                                <div className="media__video">
                                    <h2 className="media__title-video">{cleanHtmlFull(media?.AcfMedia?.videoTitle)}</h2>
                                    <div className="media__video-content">
                                        <VideoDisplay
                                            videoUrl={media?.AcfMedia?.video}
                                            title={cleanHtmlFull(media?.AcfMedia?.videoTitle)}
                                            style={{ width: '500px', height: '281px' }}
                                            mobileStyle={{ width: '370px', height: '208px' }}
                                        />
                                    </div>
                                    <div className="media__video-text"
                                         dangerouslySetInnerHTML={{__html: media?.AcfMedia?.videoDescription}}>
                                    </div>
                                </div>
                            )}
                            {media?.AcfMedia?.video && (
                                <div className="media__appointment-btn">
                                    <ButtonBrown
                                        onClick={() => setIsModalActive(true)}
                                        className="media__appointment-button"
                                    >
                                        {t('common:buttons.bookAppointment')}
                                    </ButtonBrown>
                                </div>
                            )}
                            {media?.AcfMedia?.faqContent && (
                                <div className="media-block-bottom">
                                    <div className="container">
                                        <h2 className="media__title-faq">{cleanHtmlFull(media?.AcfMedia?.faqTitle)}</h2>
                                        <div className="media__faq">
                                            <div className="media__faq-content"
                                                 dangerouslySetInnerHTML={{__html: media?.AcfMedia?.faqContent}}>
                                            </div>
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
    try {
        const {data} = await apolloClient.query({
            query: GET_MEDIA_ALL,
        });

        console.log("Fetched stories data: ", data);

        const paths = [];

        // Generate paths for each locale
        locales.forEach(locale => {
            const filteredMedias = filterByLanguage(data.medias.edges, locale);
            filteredMedias.forEach(item => {
                paths.push({
                    params: { slug: item.node.slug },
                    locale: locale
                });
            });
        });

        console.log("Generated paths: ", paths);

        return {paths, fallback: true};
    } catch (error) {
        console.error("Error fetching medias for static paths:", error);
        return {
            paths: [],
            fallback: true
        };
    }
}

export async function getStaticProps({params, locale}) {
    try {
        const {data} = await apolloClient.query({
            query: GET_MEDIA_BY_SLUG,
            variables: {slug: params.slug},
        });

        return {
            props: {
                initialData: data || {
                    mediaBy: null
                },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) =>
                    serverSideTranslations(locale, ['common'])
                )),
            },
            //revalidate: 2592000, // Revalidate every 30 days
        };
    } catch (error) {
        console.error("Error fetching media:", error);
        return {
            props: {
                initialData: { mediaBy: null },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) =>
                    serverSideTranslations(locale, ['common'])
                )),
            },
        };
    }
}

export default MediaPage;