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
import {GET_SURGERY_BY_SLUG} from "../../entities/surgery/actions/surgeryActions";
import Breadcrumbs from "../../shared/breadcrumbs-page/BreadcrumbsPage";
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Modal from '../../shared/modal/Modal';
import WordPressContent from '../../components/WordPressContent'; // ← ИМПОРТ
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


const SurgeryPage = ({initialData}) => {
    const { t } = useSafeTranslation();
    const [isModalActive, setIsModalActive] = useState(false);

    const router = useRouter();
    const {slug} = router.query;

    const {loading, error, data} = useQuery(GET_SURGERY_BY_SLUG, {
        variables: {slug},
        skip: !slug,
        fetchPolicy: 'cache-and-network',
    });

    // ISR loading state or data loading
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

    const surgery = data?.surgeryBy || initialData?.surgeryBy;

    const typeMaterial = "surgery"

    const PageProps = {
        title: surgery?.seo?.title || 'Компания',
        description: surgery?.seo?.metaDesc || 'Компания'
    };

    return (
        <MainLayout title={PageProps.title} description={PageProps.description}>
            <div className="surgery">
                <div className="container">
                    <>
                        {surgery?.AcfSurgery?.descriptionAnons && (
                            <>
                                <h1 className="surgery__title">{cleanHtmlFull(surgery?.AcfSurgery?.titleLong || '')}</h1>
                                <Breadcrumbs material={surgery} typeMaterial={typeMaterial}/>
                                <div className="surgery__anons">
                                    {surgery?.AcfSurgery?.imageAnonsPage && (
                                        <div className="surgery__anons-img">
                                            <LightGallery
                                                elementClassNames={'masonry-gallery-demo'}
                                                plugins={[lgZoom, lgShare, lgHash]}
                                                speed={500}
                                            >
                                                <a href={surgery?.AcfSurgery?.imageAnonsPage?.sourceUrl}>
                                                    <Image
                                                        src={surgery?.AcfSurgery?.imageAnonsPage?.sourceUrl}
                                                        alt={cleanHtmlFull(surgery?.AcfSurgery?.titleLong || '')}
                                                        width={400}
                                                        height={400}
                                                        layout="intrinsic"
                                                    />
                                                </a>
                                            </LightGallery>
                                        </div>
                                    )}
                                    <div className="surgery__anons-text"
                                         dangerouslySetInnerHTML={{__html: surgery?.AcfSurgery?.descriptionAnons || ''}}>
                                    </div>
                                </div>
                            </>
                        )}
                        <div className="surgery__appointment-btn">
                            <ButtonBrown
                                onClick={() => setIsModalActive(true)}
                                className="surgery__appointment-button"
                            >
                                {t('common:buttons.bookAppointment')}
                            </ButtonBrown>
                        </div>
                        <MainConsultation />
                        <MedreviewsBlock />
                        <MainStories />
                        {surgery?.content && (
                            <>
                                <div className="surgery-block-center">
                                    <div className="container">
                                        <h2 className="surgery__title-main">{cleanHtmlFull(surgery?.AcfSurgery?.titleCenter || '')}</h2>
                                        <div className="surgery__description">
                                            {surgery?.featuredImage?.node?.sourceUrl && (
                                                <div className="surgery__description-img">
                                                    <LightGallery
                                                        elementClassNames={'masonry-gallery-demo'}
                                                        plugins={[lgZoom, lgShare, lgHash]}
                                                        speed={500}
                                                    >
                                                        <a href={surgery?.featuredImage?.node?.sourceUrl}>
                                                            <Image
                                                                src={surgery?.featuredImage?.node?.sourceUrl}
                                                                alt={cleanHtmlFull(surgery?.AcfSurgery?.titleCenter || '')}
                                                                width={400}
                                                                height={400}
                                                                layout="intrinsic"
                                                            />
                                                        </a>
                                                    </LightGallery>
                                                </div>
                                            )}
                                            <div className="surgery__description-text"
                                                 dangerouslySetInnerHTML={{__html: surgery?.content || ''}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {surgery?.content && (
                            <div className="surgery__appointment-btn">
                                <ButtonBrown
                                    onClick={() => setIsModalActive(true)}
                                    className="surgery__appointment-button"
                                >
                                    {t('common:buttons.bookAppointment')}
                                </ButtonBrown>
                            </div>
                        )}

                        {surgery?.AcfSurgery?.video && (
                            <div className="surgery__video">
                                <h2 className="surgery__title-video">{cleanHtmlFull(surgery?.AcfSurgery?.videoTitle || '')}</h2>
                                <div className="surgery__video-content">
                                    <VideoDisplay
                                        videoUrl={surgery?.AcfSurgery?.video}
                                        title={cleanHtmlFull(surgery?.AcfSurgery?.videoTitle || '')}
                                    />
                                </div>
                                <div className="surgery__video-text"
                                     dangerouslySetInnerHTML={{__html: surgery?.AcfSurgery?.videoDescription || ''}}>
                                </div>
                            </div>
                        )}
                        {surgery?.AcfSurgery?.video && (
                            <div className="surgery__appointment-btn">
                                <ButtonBrown
                                    onClick={() => setIsModalActive(true)}
                                    className="surgery__appointment-button"
                                >
                                    {t('common:buttons.bookAppointment')}
                                </ButtonBrown>
                            </div>
                        )}
                        {surgery?.AcfSurgery?.faqContent && (
                            <div className="surgery-block-bottom">
                                <div className="container">
                                    <h2 className="surgery__title-faq">{cleanHtmlFull(surgery?.AcfSurgery?.faqTitle || '')}</h2>
                                    <div className="surgery__faq">
                                        <div className="surgery__faq-content"
                                             dangerouslySetInnerHTML={{__html: surgery?.AcfSurgery?.faqContent || ''}}>
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

export default SurgeryPage;

export async function getStaticPaths({ locales }) {
    console.log("⚠️ ISR enabled: surgery pages generated on-demand");
    return {
        paths: [],
        fallback: true
    };
}

export async function getStaticProps({params, locale}) {
    try {
        const {data} = await apolloClient.query({
            query: GET_SURGERY_BY_SLUG,
            variables: {slug: params.slug},
        });

        // Ensure data is serializable
        const safeData = data ? {
            surgeryBy: data.surgeryBy || null,
        } : {
            surgeryBy: null,
        };

        return {
            props: {
                initialData: safeData,
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 86400, // 24 hours
        };
    } catch (error) {
        console.error("Error fetching surgery:", error.message);
        return {
            props: {
                initialData: { 
                    surgeryBy: null,
                },
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 3600,
        };
    }
}






