import apolloClient from '@/app/graphql/apollo-client';
import {GET_ABOUTS_ALL, GET_ABOUT_BY_SLUG} from '@/entities/about/actions/aboutActions';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import React, { useState, useEffect } from 'react';
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Image from 'next/image';
import {cleanHtmlFull} from '@/shared/utils/utils-content';
import Breadcrumbs from '@/shared/breadcrumbs-page/BreadcrumbsPage';
import VideoDisplay from '@/shared/video-display/VideoDisplay';
import ButtonBrown from '@/shared/button-brown/ButtonBrown';
import Modal from '@/shared/modal/Modal';
import { useSafeTranslation } from '@/shared/hooks/useSafeTranslation';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import './index.scss';
import './media.scss';

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
import MainStories from "../../widgets/main-stories/MainStories";
import MainLayout from "../../app/layouts/MainLayout";

const AboutPage = ({initialData, seoData, isRequestAppointment}) => {
    const { t } = useSafeTranslation();
    const [isModalActive, setIsModalActive] = useState(isRequestAppointment || false);
    const router = useRouter();
    const {slug} = router.query;

    const {loading, error, data} = useQuery(GET_ABOUT_BY_SLUG, {
        variables: {slug},
        skip: !slug || isRequestAppointment, // Пропускаем GraphQL запрос для request-appointment
        fetchPolicy: 'cache-and-network',
    });

    // Show loading state while page is being generated (ISR fallback) or data loading
    if (router.isFallback) {
        return (
            <MainLayout title={seoData?.title || 'Loading...'} description={seoData?.description || ''}>
                <div style={{padding: '60px 0', textAlign: 'center'}}>
                    <h1>Loading...</h1>
                </div>
            </MainLayout>
        );
    }

    if (error) {
        return (
            <MainLayout title="Error" description="">
                <Stack sx={{width: '100%'}} spacing={2}>
                    <Alert severity="error">
                        {error.graphQLErrors ? error.graphQLErrors.map((err, index) => (
                            <div key={index}>{err.message}</div>
                        )) : 'An error occurred'}
                    </Alert>
                </Stack>
            </MainLayout>
        );
    }

    const about = data?.aboutBy || initialData?.aboutBy;

    const typeMaterial = "about";

    const PageProps = {
        title: seoData?.title || about?.seo?.title || 'О компании',
        description: seoData?.description || about?.seo?.metaDesc || 'Клиника доктора Туницкого'
    };

    return (
        <MainLayout title={PageProps.title} description={PageProps.description}>
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
                            </>
                        )}
                        <div className="about__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="about__appointment-button"
                            >
                                {t('common:buttons.bookAppointment')}
                            </ButtonBrown>
                        </div>
                        <MainConsultation />
                        <MedreviewsBlock />
                        <MainStories />
                        {about?.content && (
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
                        )}
                        {about?.content && (
                            <div className="about__appointment-btn">
                                <ButtonBrown
                                    onClick={() => setIsModalActive(true)}
                                    className="about__appointment-button"
                                >
                                    {t('common:buttons.bookAppointment')}
                                </ButtonBrown>
                            </div>
                        )}
                        {about?.AcfAbout?.video && (
                            <div className="about__video">
                                <h2 className="about__title-video">{cleanHtmlFull(about?.AcfAbout?.videoTitle || '')}</h2>
                                <div className="about__video-content">
                                    <VideoDisplay
                                        videoUrl={about?.AcfAbout?.video}
                                        title={cleanHtmlFull(about?.AcfAbout?.videoTitle || '')}
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
        </MainLayout>
    );
};

export default AboutPage;

// getStaticPaths и getStaticProps остаются БЕЗ ИЗМЕНЕНИЙ

export async function getStaticPaths({ locales }) {
    // TEMPORARY FIX: Skip GraphQL during build, generate pages on-demand
    console.log("⚠️ Skipping GraphQL fetch during build - using fallback: true");

    return {
        paths: [], // Пустой массив - страницы будут генерироваться по требованию
        fallback: true // Включаем ISR - страницы генерируются при первом запросе
    };
}

export async function getStaticProps({params, locale}) {
    // Защита от невалидных slug (например [slug] как буквальный текст)
    if (!params.slug || params.slug === '[slug]' || params.slug.includes('[') || params.slug.includes(']')) {
        return {
            notFound: true,
        };
    }

    try {
        // Удаляем языковой суффикс из slug для проверки
        const cleanSlug = params.slug.replace(/-ru$|-he$|-de$|-fr$|-es$|-ar$/, '');

          const {data} = await apolloClient.query({
            query: GET_ABOUT_BY_SLUG,
            variables: {slug: params.slug},
        });

        // Extract SEO data for immediate rendering
        const seoData = data?.aboutBy ? {
            title: data.aboutBy.seo?.title || data.aboutBy.title || 'О компании',
            description: data.aboutBy.seo?.metaDesc || 'Клиника доктора Туницкого'
        } : {
            title: 'О компании',
            description: 'Клиника доктора Туницкого'
        };

        return {
            props: {
                initialData: data || { aboutBy: null },
                seoData,
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 86400,
        };
    } catch (error) {
        console.error(`Error fetching data for about slug ${params.slug}:`, error);
        return {
            props: {
                initialData: { aboutBy: null },
                seoData: {
                    title: 'О компании',
                    description: 'Клиника доктора Туницкого'
                },
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 3600,
        };
    }
}
