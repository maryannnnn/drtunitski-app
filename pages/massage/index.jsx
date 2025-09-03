import React, {useEffect, useState} from 'react';
import '../../app/scss/app.scss';
import './index.scss';
import './media.scss';
import Link from "next/link";
import LeftLayout from "../../app/layouts/LeftLayout";
import {useQuery} from "@apollo/client";
import apolloClient from '../../app/graphql/apollo-client';
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import {GET_MASSAGE_ALL} from "../../entities/massage/actions/massageActions";
import BlockItemMassage from "../../shared/block-item-massage/BlockItemMassage";
import MainTestimonial from "../../widgets/main-testimonial/MainTestimonial";
import {testimonialTitleMassage, testimonialType} from "../../app/info/info";

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";

const IndexMassage = ({initialData}) => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const {loading, error, data} = useQuery(GET_MASSAGE_ALL, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network",
    });

    const massage = data?.massage || initialData?.massage || {};
    const massages = data?.massages?.edges || initialData?.massages?.edges || [];
    const testimonials = data?.testimonials?.edges || initialData?.testimonials?.edges || [];

    const PageProps = {
        title: massage?.seo?.title || 'Компания',
        description: massage?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="massage">
                <div className="container">
                    {loading && !massage ? (
                        <div>Loading...</div>
                    ) : error ? (
                        <Stack sx={{width: '100%'}} spacing={2}>
                            <Alert severity="error">
                                {error.graphQLErrors ? error.graphQLErrors.map((err, index) => (
                                    <div key={index}>{err.message}</div>
                                )) : 'An error occurred'}
                            </Alert>
                        </Stack>
                    ) : isClient && (
                        <>
                            {massage?.AcfMassage?.descriptionAnons && (
                                <div className="massage-block-top">
                                    <h1 className="massage__title">{cleanHtmlFull(massage?.AcfMassage?.titleLong || '')}</h1>
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
                                                            alt={massage?.AcfMassage?.imageAnonsPage?.altText}
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
                                </div>
                            )}
                            <div className="block-massages">
                                {massages?.filter(el => el.node?.id !== massage.id)
                                    .sort((a, b) => a.node?.menuOrder - b.node?.menuOrder)
                                    .map((item, index) => (
                                        <div key={item?.node?.id || index}>
                                            <BlockItemMassage item={item}/>
                                        </div>
                                    ))}
                            </div>
                            {massage?.content && (
                                <>
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
                                                                src={massage?.featuredImage?.node?.sourceUrl || ''}
                                                                alt={massage?.featuredImage?.node?.altText || ''}
                                                                width={400}
                                                                height={600}
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
                                </>
                            )}
                            {massage?.AcfMassage?.video && (
                                <div className="massage-block-video">
                                    <h2
                                        className="massage__title-video">{cleanHtmlFull(massage?.AcfMassage?.videoTitle || '')}</h2>
                                    <div className="massage__video">
                                        <div className="massage__video-content"
                                             dangerouslySetInnerHTML={{__html: massage?.AcfMassage?.video || ''}}>
                                        </div>
                                        <div className="massage__video-text"
                                             dangerouslySetInnerHTML={{__html: massage?.AcfMassage?.videoDescription || ''}}>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {testimonials && testimonials?.length > 0 && (
                                <>
                                    <h2 className="massage__title-main">{testimonialTitleMassage}</h2>
                                    <MainTestimonial data={data} type={testimonialType.massage}/>
                                </>
                            )}
                            {massage?.AcfMassage?.faqTitle && (
                                <div className="massage-block-bottom">
                                    <h2 className="massage__title-gallery">{cleanHtmlFull(massage?.AcfMassage?.faqTitle || '')}</h2>
                                    <div className="massage__gallery">
                                        <div className="massage__gallery-content"
                                             dangerouslySetInnerHTML={{__html: massage?.AcfMassage?.faqContent || ''}}>
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

export async function getStaticProps() {
    try {
        const {data} = await apolloClient.query({query: GET_MASSAGE_ALL});
        return {
            props: {initialData: data},
            revalidate: 86400, // Пересборка каждый день
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {props: {initialData: {}}};
    }
}

export default IndexMassage;
