import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import {useQuery} from "@apollo/client";
import {GET_SALON_BY_SLUG, GET_SALON_ALL} from "../../entities/salon/actions/salonActions";
import apolloClient from "../../app/graphql/apollo-client";
import MainLayout from "../../app/layouts/MainLayout";
import React from "react";
import LeftLayout from "../../app/layouts/LeftLayout";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import Link from "next/link";
import Image from "next/image";

const SalonPage = ({initialData}) => {
    const router = useRouter();
    const {slug} = router.query;

    console.log("Slug data: ", slug);

    const {loading, error, data} = useQuery(GET_SALON_BY_SLUG, {
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

    const salon = data?.salonBy || initialData?.salonBy;

    const PageProps = {
        title: salon?.seo?.title || 'Компания',
        description: salon?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="salon">
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
                            <h1 className="salon__title">{cleanHtmlFull(salon?.AcfSalon?.titleLong)}</h1>
                            <div className="salon__anons">
                                <div className="salon__anons-img">
                                    {salon?.AcfSalon?.imageAnons && (
                                        <Link href={salon?.AcfSalon?.imageAnons?.sourceUrl}>
                                            <Image
                                                src={salon?.AcfSalon?.imageAnons?.sourceUrl}
                                                alt={salon?.AcfSalon?.imageAnons?.altText}
                                                width={500}
                                                height={400}
                                                layout="intrinsic"
                                            />
                                        </Link>
                                    )}
                                </div>
                                <div className="salon__anons-text"
                                     dangerouslySetInnerHTML={{__html: salon?.AcfSalon?.descriptionAnons}}>
                                </div>
                            </div>
                            <div className="salon-block-center">
                                <h2 className="salon__title-main">{cleanHtmlFull(salon?.AcfSalon?.titleCenter)}</h2>
                                <div className="salon__description">
                                    {salon?.AcfSalon?.imageAnons && (
                                        <div className="salon__description-img">
                                            <Link href={salon?.featuredImage?.node?.sourceUrl}>
                                                <Image
                                                    src={salon?.featuredImage?.node?.sourceUrl}
                                                    alt={salon?.featuredImage?.node?.altText}
                                                    width={500}
                                                    height={400}
                                                    layout="intrinsic"
                                                />
                                            </Link>
                                        </div>
                                    )}
                                    <div className="salon__description-text"
                                         dangerouslySetInnerHTML={{__html: salon?.content}}>
                                    </div>
                                </div>
                            </div>
                            {salon?.AcfSalon?.video && (
                                <div className="salon-block-video">
                                    <h2
                                        className="salon__title-video">{cleanHtmlFull(salon?.AcfSalon?.videoTitle)}</h2>
                                    <div className="salon__video">
                                        <div className="salon__video-content"
                                             dangerouslySetInnerHTML={{__html: salon?.AcfSalon?.video}}>
                                        </div>
                                        <div className="salon__video-text"
                                             dangerouslySetInnerHTML={{__html: salon?.AcfSalon?.videoDescription}}>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="salon-block-bottom">
                                <h2 className="salon__title-faq">{cleanHtmlFull(salon?.AcfSalon?.faqTitle)}</h2>
                                <div className="salon__faq">

                                    <div className="salon__faq-content"
                                         dangerouslySetInnerHTML={{__html: salon?.AcfSalon?.faqContent}}>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
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
        //revalidate: 2592000, // Revalidate every 30 days
    };
}

export default SalonPage;




