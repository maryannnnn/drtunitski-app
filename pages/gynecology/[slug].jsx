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
import NextImage from "next/image"; // ← ИЗМЕНИЛИ ИМЯ НА NextImage
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


const GynecologyPage = ({initialData}) => {
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

    const gynecology = data?.gynecologyBy || initialData?.gynecologyBy;

    const typeMaterial = "gynecology"

    const PageProps = {
        title: gynecology?.seo?.title || 'Компания',
        description: gynecology?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
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
                                                    <NextImage // ← ИСПОЛЬЗУЕМ NextImage
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
                                    <WordPressContent
                                        content={gynecology?.AcfGynecology?.descriptionAnons}
                                        className="gynecology__anons-text"
                                    />
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
                                                            <NextImage // ← ИСПОЛЬЗУЕМ NextImage
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
                                            <WordPressContent
                                                content={gynecology?.content}
                                                className="gynecology__description-text"
                                            />
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
                                <WordPressContent
                                    content={gynecology?.AcfGynecology?.videoDescription}
                                    className="gynecology__video-text"
                                />
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
                                        <WordPressContent
                                            content={gynecology?.AcfGynecology?.faqContent}
                                            className="gynecology__faq-content"
                                        />
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
    console.log("⚠️ ISR enabled: gynecology pages generated on-demand");
    return {
        paths: [],
        fallback: true
    };
}

export async function getStaticProps({params, locale}) {
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

        return {
            props: {
                initialData: safeData,
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
                ...(await serverSideTranslations(locale, ['common'])),
            },
            revalidate: 3600,
        };
    }
}

export default GynecologyPage;




