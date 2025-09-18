import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import { useTranslation } from 'next-i18next';
import { filterByLanguage } from '../../shared/utils/language-filter';
import VideoDisplay from '../../shared/video-display/VideoDisplay';
import {useQuery} from "@apollo/client";
import apolloClient from "../../app/graphql/apollo-client";
import React, {useEffect, useState} from "react";
import LeftLayout from "../../app/layouts/LeftLayout";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import Image from "next/image";
import {GET_MASSAGE_ALL, GET_MASSAGE_BY_SLUG} from "../../entities/massage/actions/massageActions";
import MainTestimonial from "../../widgets/main-testimonial/MainTestimonial";
import AttributesMassage from "../../widgets/attributes-massage/AtributesMassage";
import {attributeTitleMassage, breadcrumbType, testimonialTitleMassage, testimonialType} from "../../app/info/info";
import Breadcrumbs from "../../shared/breadcrumbs-page/BreadcrumbsPage";

import GalleryLightbox from "../../shared/gallegry-lightbox/GalleryLightbox";
import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), { ssr: false });
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";


const MassagePage = ({initialData}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const router = useRouter();
    const {slug} = router.query;

    const {loading, error, data} = useQuery(GET_MASSAGE_BY_SLUG, {
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

    if (!isClient) {
        return <div>Loading...</div>;
    }

    const massage = data?.massageBy || initialData?.massageBy;
    const testimonials = data?.testimonials?.edges || initialData?.testimonials?.edges || [];

    const typeMaterial = "massage"

    const PageProps = {
        title: massage?.seo?.title || 'Компания',
        description: massage?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="massage">
                <div className="container">
                    <>
                        {massage?.AcfMassage?.descriptionAnons && (
                            <>
                                <h1 className="massage__title">{cleanHtmlFull(massage?.AcfMassage?.titleLong || '')}</h1>
                                <Breadcrumbs material={massage} typeMaterial={typeMaterial}/>
                                <div className="massage__anons">
                                    {massage?.AcfMassage?.imageAnonsPage && (
                                        <div className="massage__anons-img">
                                            <LightGallery
                                                elementClassNames={'masonry-gallery-demo'}
                                                plugins={[lgZoom, lgShare, lgHash]}
                                                speed={500}
                                            >
                                                <a href={massage?.AcfMassage?.imageAnonsPage?.sourceUrl}>
                                                    <Image
                                                        src={massage?.AcfMassage?.imageAnonsPage?.sourceUrl}
                                                        alt={cleanHtmlFull(massage?.AcfMassage?.titleLong || '')}
                                                        width={400}
                                                        height={400}
                                                        layout="intrinsic"
                                                    />
                                                </a>
                                            </LightGallery>
                                        </div>
                                    )}
                                    <div className="massage__anons-text"
                                         dangerouslySetInnerHTML={{__html: massage?.AcfMassage?.descriptionAnons || ''}}>
                                    </div>
                                </div>
                            </>
                        )}
                        {massage && (
                            <>
                                <h2 className="massage__title-main">{attributeTitleMassage}</h2>
                                <AttributesMassage massage={massage}/>
                            </>
                        )}

                        {massage?.galleryImages && massage?.galleryImages?.length > 0 && (
                            <div className="massage-block-gallery">
                                <h2 className="massage__title-main">
                                    {cleanHtmlFull(massage?.AcfMassage?.titleGallery || '')}
                                </h2>
                                <GalleryLightbox images={massage?.galleryImages ?? []}/>
                            </div>
                        )}

                        {massage?.content && (
                                <div className="massage-block-center">
                                    <h2 className="massage__title-main">{cleanHtmlFull(massage?.AcfMassage?.titleCenter || '')}</h2>
                                    <div className="massage__description">
                                        {massage?.featuredImage?.node?.sourceUrl && (
                                            <div className="massage__description-img">
                                                <LightGallery
                                                    elementClassNames={'masonry-gallery-demo'}
                                                    plugins={[lgZoom, lgShare, lgHash]}
                                                    speed={500}
                                                >
                                                    <a href={massage?.featuredImage?.node?.sourceUrl}>
                                                        <Image
                                                            src={massage?.featuredImage?.node?.sourceUrl}
                                                            alt={cleanHtmlFull(massage?.AcfMassage?.titleCenter || '')}
                                                            width={400}
                                                            height={400}
                                                            layout="intrinsic"
                                                        />
                                                    </a>
                                                </LightGallery>
                                            </div>
                                        )}
                                        <div className="massage__description-text"
                                             dangerouslySetInnerHTML={{__html: massage?.content || ''}}>
                                        </div>
                                    </div>
                                </div>
                        )}

                        {massage?.AcfMassage?.video && (
                            <div className="massage__video">
                                <h2 className="massage__title-video">{cleanHtmlFull(massage?.AcfMassage?.videoTitle || '')}</h2>
                                <div className="massage__video-content">
                                    <VideoDisplay
                                        videoUrl={massage?.AcfMassage?.video}
                                        title={cleanHtmlFull(massage?.AcfMassage?.videoTitle || '')}
                                    />
                                </div>
                                <div className="massage__video-text"
                                     dangerouslySetInnerHTML={{__html: massage?.AcfMassage?.videoDescription || ''}}>
                                </div>
                            </div>
                        )}
                        {testimonials && testimonials?.length > 0 && (
                            <>
                                <h2 className="massage__title-main">{testimonialTitleMassage}</h2>
                                <MainTestimonial data={data} type={testimonialType.massage}/>
                            </>
                        )}
                        {massage?.AcfMassage?.faqContent && (
                            <div className="massage-block-bottom">
                                <h2 className="massage__title-faq">{cleanHtmlFull(massage?.AcfMassage?.faqTitle || '')}</h2>
                                <div className="massage__faq">
                                    <div className="massage__faq-content"
                                         dangerouslySetInnerHTML={{__html: massage?.AcfMassage?.faqContent || ''}}>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                </div>
            </div>
        </LeftLayout>
    );
};

export async function getStaticPaths({ locales }) {
    try {
        const {data} = await apolloClient.query({
            query: GET_MASSAGE_ALL,
        });

        console.log("Fetched massages data: ", data);

        const paths = [];
        
        // Generate paths for each locale
        locales.forEach(locale => {
            const filteredItems = filterByLanguage(data.massages.edges, locale);
            filteredItems.forEach(item => {
                paths.push({
                    params: { slug: item.node.slug },
                    locale: locale
                });
            });
        });

        console.log("Generated paths: ", paths);

        return {paths, fallback: true};
    } catch (error) {
        console.error("Error fetching massages for static paths:", error);
        return {
            paths: [],
            fallback: true
        };
    }
}

export async function getStaticProps({params, locale}) {
    try {
        const {data} = await apolloClient.query({
            query: GET_MASSAGE_BY_SLUG,
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
        console.error("Error fetching massage:", error);
        return {
            props: {
                initialData: { massageBy: null },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) => 
                    serverSideTranslations(locale, ['common'])
                )),
            },
        };
    }
}

export default MassagePage;




