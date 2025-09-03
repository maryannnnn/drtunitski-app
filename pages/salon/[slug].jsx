import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import {useQuery} from "@apollo/client";
import {GET_SALON_BY_SLUG, GET_SALON_ALL} from "../../entities/salon/actions/salonActions";
import apolloClient from "../../app/graphql/apollo-client";
import React from "react";
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

const SalonPage = ({initialData}) => {
    const router = useRouter();
    const {slug} = router.query;

    const {loading, error, data} = useQuery(GET_SALON_BY_SLUG, {
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

    const salon = data?.salonBy || initialData?.salonBy;

    const typeMaterial = "salon"

    const PageProps = {
        title: salon?.seo?.title || 'Компания',
        description: salon?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="salon">
                <div className="container">
                    <>
                        {salon?.AcfSalon?.descriptionAnons && (
                            <>
                                <h1 className="salon__title">{cleanHtmlFull(salon?.AcfSalon?.titleLong || '')}</h1>
                                <Breadcrumbs material={salon} typeMaterial={typeMaterial}/>
                                <div className="salon__anons">
                                    {salon?.AcfSalon?.imageAnons && (
                                        <div className="salon__anons-img">
                                            <LightGallery
                                                elementClassNames={'masonry-gallery-demo'}
                                                plugins={[lgZoom, lgShare, lgHash]}
                                                speed={500}
                                            >
                                                <a href={salon?.AcfSalon?.imageAnons?.sourceUrl}>
                                                    <Image
                                                        src={salon?.AcfSalon?.imageAnons?.sourceUrl}
                                                        alt={salon?.AcfSalon?.imageAnons?.altText || 'Image'}
                                                        width={400}
                                                        height={400}
                                                        layout="intrinsic"
                                                    />
                                                </a>
                                            </LightGallery>
                                        </div>
                                    )}
                                    <div className="salon__anons-text"
                                         dangerouslySetInnerHTML={{__html: salon?.AcfSalon?.descriptionAnons || ''}}>
                                    </div>
                                </div>
                            </>
                        )}
                        {salon?.content && (
                            <>
                                <div className="salon-block-center">
                                    <h2 className="salon__title-main">{cleanHtmlFull(salon?.AcfSalon?.titleCenter || '')}</h2>
                                    <div className="salon__description">
                                        {salon?.featuredImage?.node?.sourceUrl && (
                                            <div className="salon__description-img">
                                                <LightGallery
                                                    elementClassNames={'masonry-gallery-demo'}
                                                    plugins={[lgZoom, lgShare, lgHash]}
                                                    speed={500}
                                                >
                                                    <a href={salon?.featuredImage?.node?.sourceUrl}>
                                                        <Image
                                                            src={salon?.featuredImage?.node?.sourceUrl}
                                                            alt={salon?.featuredImage?.node?.altText || 'Image'}
                                                            width={400}
                                                            height={400}
                                                            layout="intrinsic"
                                                        />
                                                    </a>
                                                </LightGallery>
                                            </div>
                                        )}
                                        <div className="salon__description-text"
                                             dangerouslySetInnerHTML={{__html: salon?.content || ''}}>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {salon?.AcfSalon?.video && (
                            <div className="salon-block-video">
                                <h2 className="salon__title-video">{cleanHtmlFull(salon?.AcfSalon?.videoTitle || '')}</h2>
                                <div className="salon__video">
                                    <div className="salon__video-content"
                                         dangerouslySetInnerHTML={{__html: salon?.AcfSalon?.video || ''}}>
                                    </div>
                                    <div className="salon__video-text"
                                         dangerouslySetInnerHTML={{__html: salon?.AcfSalon?.videoDescription || ''}}>
                                    </div>
                                </div>
                            </div>
                        )}
                        {salon?.AcfSalon?.faqContent && (
                            <div className="salon-block-bottom">
                                <h2 className="salon__title-faq">{cleanHtmlFull(salon?.AcfSalon?.faqTitle || '')}</h2>
                                <div className="salon__faq">
                                    <div className="salon__faq-content"
                                         dangerouslySetInnerHTML={{__html: salon?.AcfSalon?.faqContent || ''}}>
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

export async function getStaticPaths() {
    const {data} = await apolloClient.query({
        query: GET_SALON_ALL,
    });

    console.log("Fetched salons data: ", data);

    const paths = data.salons.edges.map(item => ({
        params: {slug: item.node.slug},
    }));

    console.log("Generated paths: ", paths);

    return {paths, fallback: true};
}

export async function getStaticProps({params}) {
    const {data} = await apolloClient.query({
        query: GET_SALON_BY_SLUG,
        variables: {slug: params.slug},
    });

    return {
        props: {
            initialData: data,
        },
        revalidate: 2592000, // Revalidate every 30 days
    };
}


export default SalonPage;


