import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import { useTranslation } from 'next-i18next';
import { filterByLanguage } from '../../shared/utils/language-filter';
import VideoDisplay from '../../shared/video-display/VideoDisplay';
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Modal from '../../shared/modal/Modal';
import {useQuery} from "@apollo/client";
import {GET_ABOUT_BY_SLUG, GET_ABOUT_ALL} from "../../entities/about/actions/aboutActions";
import apolloClient from "../../app/graphql/apollo-client";
import React, { useState } from "react";
import LeftLayout from "../../app/layouts/LeftLayout";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../shared/breadcrumbs-page/BreadcrumbsPage";

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";

const AboutPage = ({initialData}) => {
    const { t } = useTranslation();
    const router = useRouter();
    const {slug} = router.query;
    const [isModalActive, setIsModalActive] = useState(false);

    const {loading, error, data} = useQuery(GET_ABOUT_BY_SLUG, {
        variables: {slug},
        skip: !slug,
        fetchPolicy: 'cache-and-network',
    });

    if (router.isFallback || loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return (
            <Stack sx={{width: '100%'}} spacing={2}>
                <Alert severity="error">
                    {error.graphQLErrors ? error.graphQLErrors.map((err, index) => (
                        <div key={index}>{err.message}</div>
                    )) : 'An error occurred'}
                </Alert>
            </Stack>
        );
    }

    const about = data?.aboutBy || initialData?.aboutBy;

    const typeMaterial = "about"

    const PageProps = {
        title: about?.seo?.title || 'Clinic',
        description: about?.seo?.metaDesc || 'Clinic'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="about">
                <div className="container">
                    <>
                        {about?.AcfAbout?.descriptionAnons && (
                            <>
                                <h1 className="about__title">{cleanHtmlFull(about?.AcfAbout?.titleLong || '')}</h1>
                                <Breadcrumbs material={about} typeMaterial={typeMaterial}/>
                                <div className="about__anons">
                                    {about?.AcfAbout?.imageAnons && (
                                        <div className="about__anons-img">
                                            <LightGallery
                                                elementClassNames={'masonry-gallery-demo'}
                                                plugins={[lgZoom, lgShare, lgHash]}
                                                speed={500}
                                            >
                                                <a href={about?.AcfAbout?.imageAnons?.sourceUrl}>
                                                    <Image
                                                        src={about?.AcfAbout?.imageAnons?.sourceUrl}
                                                        alt={cleanHtmlFull(about?.AcfAbout?.titleLong || '')}
                                                        width={400}
                                                        height={400}
                                                        layout="intrinsic"
                                                    />
                                                </a>
                                            </LightGallery>
                                        </div>
                                    )}
                                    <div className="about__anons-text"
                                         dangerouslySetInnerHTML={{__html: about?.AcfAbout?.descriptionAnons || ''}}>
                                    </div>
                                </div>
                                <div className="about__appointment-btn">
                                    <ButtonBrown
                                        onClick={() => setIsModalActive(true)}
                                        className="about__appointment-button"
                                    >
                                        {t('common:buttons.bookAppointment')}
                                    </ButtonBrown>
                                </div>
                            </>
                        )}
                        {about?.content && (
                            <>
                                <div className="about-block-center">
                                    <div className="container">
                                        <h2 className="about__title-main">{cleanHtmlFull(about?.AcfAbout?.titleCenter || '')}</h2>
                                        <div className="about__description">
                                            {about?.featuredImage?.node?.sourceUrl && (
                                                <div className="about__description-img">
                                                    <LightGallery
                                                        elementClassNames={'masonry-gallery-demo'}
                                                        plugins={[lgZoom, lgShare, lgHash]}
                                                        speed={500}
                                                    >
                                                        <a href={about?.featuredImage?.node?.sourceUrl}>
                                                            <Image
                                                                src={about?.featuredImage?.node?.sourceUrl}
                                                                alt={cleanHtmlFull(about?.AcfAbout?.titleCenter || '')}
                                                                width={400}
                                                                height={400}
                                                                layout="intrinsic"
                                                            />
                                                        </a>
                                                    </LightGallery>
                                                </div>
                                            )}
                                            <div className="about__description-text"
                                                 dangerouslySetInnerHTML={{__html: about?.content || ''}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="about__appointment-btn">
                                    <ButtonBrown
                                        onClick={() => setIsModalActive(true)}
                                        className="about__appointment-button"
                                    >
                                        {t('common:buttons.bookAppointment')}
                                    </ButtonBrown>
                                </div>
                            </>
                        )}
                        {about?.AcfAbout?.video && (
                            <div className="about__video">
                                <h2 className="about__title-video">{cleanHtmlFull(about?.AcfAbout?.videoTitle || '')}</h2>
                                <div className="about__video-content">
                                    <VideoDisplay
                                        videoUrl={about?.AcfAbout?.video}
                                        title={cleanHtmlFull(about?.AcfAbout?.videoTitle || '')}
                                        style={{ width: '500px', height: '281px' }}
                                        mobileStyle={{ width: '370px', height: '208px' }}
                                    />
                                </div>
                                <div className="about__video-text"
                                     dangerouslySetInnerHTML={{__html: about?.AcfAbout?.videoDescription || ''}}>
                                </div>
                            </div>
                        )}
                        {about?.AcfAbout?.video && (
                            <div className="about__appointment-btn">
                                <ButtonBrown
                                    onClick={() => setIsModalActive(true)}
                                    className="about__appointment-button"
                                >
                                    {t('common:buttons.bookAppointment')}
                                </ButtonBrown>
                            </div>
                        )}
                        {about?.AcfAbout?.faqContent && (
                            <div className="about-block-bottom">
                                <div className="container">
                                    <h2 className="about__title-faq">{cleanHtmlFull(about?.AcfAbout?.faqTitle || '')}</h2>
                                    <div className="about__faq">
                                        <div className="about__faq-content"
                                             dangerouslySetInnerHTML={{__html: about?.AcfAbout?.faqContent || ''}}>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
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
            query: GET_ABOUT_ALL,
        });

        console.log("Fetched abouts data: ", data);

        const paths = data.abouts.edges.map(item => ({
            params: {slug: item.node.slug},
        }));

        console.log("Generated paths: ", paths);

        return {paths, fallback: true};
    } catch (error) {
        console.error("Error fetching abouts for static paths:", error);
        return {
            paths: [],
            fallback: true
        };
    }
}

export async function getStaticProps({params, locale}) {
    try {
        const {data} = await apolloClient.query({
            query: GET_ABOUT_BY_SLUG,
            variables: {slug: params.slug},
        });

        return {
            props: {
                initialData: data,
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) => 
                    serverSideTranslations(locale, ['common'])
                )),
            },
            revalidate: 2592000, // Revalidate every 30 days
        };
    } catch (error) {
        console.error("Error fetching about:", error);
        return {
            props: {
                initialData: { aboutBy: null },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) => 
                    serverSideTranslations(locale, ['common'])
                )),
            },
        };
    }
}


export default AboutPage;

