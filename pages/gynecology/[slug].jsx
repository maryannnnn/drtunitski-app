import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import { useSafeTranslation } from '../../shared/hooks/useSafeTranslation';
import VideoDisplay from '../../shared/video-display/VideoDisplay';
import {useQuery} from "@apollo/client";
import apolloClient from "../../app/graphql/apollo-client";
import React, {useState} from "react";
import LeftLayout from "../../app/layouts/LeftLayout";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import Image from "next/image";
import {GET_GYNECOLOGY_BY_SLUG} from "../../entities/gynecology/actions/gynecologyActions";
import Breadcrumbs from "../../shared/breadcrumbs-page/BreadcrumbsPage";
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Modal from '../../shared/modal/Modal';
import WordPressContent from '../../components/WordPressContent';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), { ssr: false });
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";
import MainConsultation from "../../widgets/main-consultation";
import MedreviewsBlock from "../../shared/medreviews-block/MedreviewsBlock";
import MainStories from "../../widgets/main-stories/MainStories";
import MainLayout from "../../app/layouts/MainLayout";


const GynecologyPage = ({initialData, seoData}) => {
    const { t } = useSafeTranslation();
    const [isModalActive, setIsModalActive] = useState(false);

    const router = useRouter();
    const {slug} = router.query;

    const {loading, error, data} = useQuery(GET_GYNECOLOGY_BY_SLUG, {
        variables: {slug},
        skip: !slug,
        fetchPolicy: 'cache-and-network',
    });

    // ISR loading state or data loading
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

    const gynecology = data?.gynecologyBy || initialData?.gynecologyBy;

    const typeMaterial = "gynecology"

    const PageProps = {
        title: seoData?.title || gynecology?.seo?.title || 'Гинекология',
        description: seoData?.description || gynecology?.seo?.metaDesc || 'Клиника доктора Туницкого'
    };

    return (
        <MainLayout title={PageProps.title} description={PageProps.description}>
            <div className="gynecology">
                <div className="container">
                    <>
                        {gynecology?.AcfGynecology?.descriptionAnons && (
                            <>
                                <h1 className="gynecology__title">{cleanHtmlFull(gynecology?.AcfGynecology?.titleLong || '')}</h1>
                                <Breadcrumbs material={gynecology} typeMaterial={typeMaterial}/>
                                <div className="gynecology__anons">
                                    {gynecology?.AcfGynecology?.imageAnonsPage && (
                                        <div className="gynecology__anons-img">
                                            <LightGallery
                                                elementClassNames={'masonry-gallery-demo'}
                                                plugins={[lgZoom, lgShare, lgHash]}
                                                speed={500}
                                            >
                                                <a href={gynecology?.AcfGynecology?.imageAnonsPage?.sourceUrl}>
                                                    <Image
                                                        src={gynecology?.AcfGynecology?.imageAnonsPage?.sourceUrl}
                                                        alt={cleanHtmlFull(gynecology?.AcfGynecology?.titleLong || '')}
                                                        width={400}
                                                        height={400}
                                                        layout="intrinsic"
                                                    />
                                                </a>
                                            </LightGallery>
                                        </div>
                                    )}
                                    <div className="gynecology__anons-text"
                                         dangerouslySetInnerHTML={{__html: gynecology?.AcfGynecology?.descriptionAnons || ''}}>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="gynecology__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="gynecology__appointment-button"
                            >
                                {t('common:buttons.bookAppointment')}
                            </ButtonBrown>
                        </div>
                        <MainConsultation />
                        <MedreviewsBlock />
                        <MainStories />
                        {gynecology?.content && (
                            <>
                                <div className="gynecology-block-center">
                                    <div className="container">
                                        <h2 className="gynecology__title-main">{cleanHtmlFull(gynecology?.AcfGynecology?.titleCenter || '')}</h2>
                                        <div className="gynecology__description">
                                            {gynecology?.featuredImage?.node?.sourceUrl && (
                                                <div className="gynecology__description-img">
                                                    <LightGallery
                                                        elementClassNames={'masonry-gallery-demo'}
                                                        plugins={[lgZoom, lgShare, lgHash]}
                                                        speed={500}
                                                    >
                                                        <a href={gynecology?.featuredImage?.node?.sourceUrl}>
                                                            <Image
                                                                src={gynecology?.featuredImage?.node?.sourceUrl}
                                                                alt={cleanHtmlFull(gynecology?.AcfGynecology?.titleCenter || '')}
                                                                width={400}
                                                                height={400}
                                                                layout="intrinsic"
                                                            />
                                                        </a>
                                                    </LightGallery>
                                                </div>
                                            )}
                                            <div className="gynecology__description-text"
                                                 dangerouslySetInnerHTML={{__html: gynecology?.content || ''}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {gynecology?.content && (
                            <div className="gynecology__appointment-btn">
                                <ButtonBrown
                                    onClick={() => setIsModalActive(true)}
                                    className="gynecology__appointment-button"
                                >
                                    {t('common:buttons.bookAppointment')}
                                </ButtonBrown>
                            </div>
                        )}

                        {gynecology?.AcfGynecology?.video && (
                            <div className="gynecology__video">
                                <h2 className="gynecology__title-video">{cleanHtmlFull(gynecology?.AcfGynecology?.videoTitle || '')}</h2>
                                <div className="gynecology__video-content">
                                    <VideoDisplay
                                        videoUrl={gynecology?.AcfGynecology?.video}
                                        title={cleanHtmlFull(gynecology?.AcfGynecology?.videoTitle || '')}
                                    />
                                </div>
                                <div className="gynecology__video-text"
                                     dangerouslySetInnerHTML={{__html: gynecology?.AcfGynecology?.videoDescription || ''}}>
                                </div>
                            </div>
                        )}
                        {gynecology?.AcfGynecology?.video && (
                            <div className="gynecology__appointment-btn">
                                <ButtonBrown
                                    onClick={() => setIsModalActive(true)}
                                    className="gynecology__appointment-button"
                                >
                                    {t('common:buttons.bookAppointment')}
                                </ButtonBrown>
                            </div>
                        )}
                        {gynecology?.AcfGynecology?.faqContent && (
                            <div className="gynecology-block-bottom">
                                <div className="container">
                                    <h2 className="gynecology__title-faq">{cleanHtmlFull(gynecology?.AcfGynecology?.faqTitle || '')}</h2>
                                    <div className="gynecology__faq">
                                        <div className="gynecology__faq-content"
                                             dangerouslySetInnerHTML={{__html: gynecology?.AcfGynecology?.faqContent || ''}}>
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

export default GynecologyPage;

export async function getStaticPaths({ locales }) {
    console.log("⚠️ ISR enabled: gynecology pages generated on-demand");
    return {
        paths: [],
        fallback: true
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
        const {data} = await apolloClient.query({
            query: GET_GYNECOLOGY_BY_SLUG,
            variables: {slug: params.slug},
        });

        // Ensure data is serializable
        const safeData = data ? {
            gynecologyBy: data.gynecologyBy || null,
        } : {
            gynecologyBy: null,
        };

        // Extract SEO data for immediate rendering
        const seoData = data?.gynecologyBy ? {
            title: data.gynecologyBy.seo?.title || data.gynecologyBy.title || 'Гинекология',
            description: data.gynecologyBy.seo?.metaDesc || 'Клиника доктора Туницкого'
        } : {
            title: 'Гинекология',
            description: 'Клиника доктора Туницкого'
        };

        return {
            props: {
                initialData: safeData,
                seoData,
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 86400, // 24 hours
        };
    } catch (error) {
        console.error("Error fetching gynecology:", error.message);
        return {
            props: {
                initialData: { 
                    gynecologyBy: null,
                },
                seoData: {
                    title: 'Гинекология',
                    description: 'Клиника доктора Туницкого'
                },
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 3600,
        };
    }
}






