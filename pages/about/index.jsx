import React from 'react';
import '../../app/scss/app.scss';
import './index.scss';
import './media.scss';
import Link from "next/link";
import LeftLayout from "../../app/layouts/LeftLayout";
import {useQuery} from "@apollo/client";
import apolloClient from '../../app/graphql/apollo-client';
import {GET_ABOUT_ALL} from "../../entities/about/actions/aboutActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import {cleanHtml, cleanHtmlFull, trimTextFullCleanedHTML} from "../../shared/utils/utils-content";
import BlockItemAbouts from "../../shared/block-item-abouts/BlockItemAbouts";

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";

const IndexAbout = ({initialData}) => {
    const {loading, error, data} = useQuery(GET_ABOUT_ALL, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network",
    });

    const about = data?.about || initialData?.about;
    const abouts = data?.abouts?.edges || initialData?.abouts?.edges;

    const PageProps = {
        title: about?.seo?.title || 'Компания',
        description: about?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="about">
                <div className="container">
                    {loading && !about ? (
                        <div>...</div>
                    ) : error ? (
                        <Stack sx={{width: '100%'}} spacing={2}>
                            <Alert severity="error">
                                {error.graphQLErrors ? error.graphQLErrors.map((err, index) => (
                                    <div key={index}>{err.message}</div>
                                )) : 'An error occurred'}
                            </Alert>
                        </Stack>
                    ) : (
                        <>
                            {about?.AcfAbout?.descriptionAnons && (
                                <div className="about-block-top">
                                    <h1 className="about__title">{cleanHtmlFull(about?.AcfAbout?.titleLong || '')}</h1>
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
                                                        alt={about?.AcfAbout?.imageAnons?.altText}
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
                                </div>
                            )}
                            <div className="block-abouts">
                                {abouts?.filter(el => el?.node?.id && about?.id && el.node.id !== about.id)
                                    .sort((a, b) => (a?.node?.menuOrder || 0) - (b?.node?.menuOrder || 0))
                                    .map(item => (
                                        <div key={item?.node?.id}>
                                            <BlockItemAbouts item={item}/>
                                        </div>
                                    ))}
                            </div>
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
                                                                    src={about?.featuredImage?.node?.sourceUrl || ''}
                                                                    alt={about?.featuredImage?.node?.altText || ''}
                                                                    width={400}
                                                                    height={600}
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
                                </>
                            )}
                            {about?.AcfAbout?.video && (
                                <div className="about-block-video">
                                    <h2
                                        className="about__title-video">{cleanHtmlFull(about?.AcfAbout?.videoTitle || '')}</h2>
                                    <div className="about__video">
                                        <div className="about__video-content"
                                             dangerouslySetInnerHTML={{__html: about?.AcfAbout?.video || ''}}>
                                        </div>
                                        <div className="about__video-text"
                                             dangerouslySetInnerHTML={{__html: about?.AcfAbout?.videoDescription || ''}}>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {about?.AcfAbout?.faqTitle && (
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
                    )}
                </div>
            </div>
        </LeftLayout>
    );
};

export async function getStaticProps() {
    try {
        const {data} = await apolloClient.query({
            query: GET_ABOUT_ALL
        });

        return {
            props: {
                initialData: data
            },
            revalidate: 2592000, // Revalidate every 30 days
        };
    } catch (error) {
        console.error("Error fetching about data:", error);
        return {
            props: {
                initialData: { 
                    about: null,
                    abouts: { edges: [] }
                }
            },
            revalidate: 60, // Retry in 1 minute
        };
    }
}

export default IndexAbout;