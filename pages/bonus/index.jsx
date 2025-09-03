import React from 'react';
import '../../app/scss/app.scss';
import './index.scss';
import './media.scss';
import Link from "next/link";
import LeftLayout from "../../app/layouts/LeftLayout";
import {useQuery} from "@apollo/client";
import apolloClient from '../../app/graphql/apollo-client';
import {GET_BONUS_ALL} from "../../entities/bonus/actions/bonusActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import BlockItemBonus from "../../shared/block-item-bonus/BlockItemBonus";

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";

const IndexBonus = ({initialData}) => {

    const {loading, error, data} = useQuery(GET_BONUS_ALL, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network",
    });

    const bonus = data?.bonus || initialData?.bonus;
    const bonuses = data?.bonuses?.edges || initialData?.bonuses?.edges;

    const PageProps = {
        title: bonus?.seo?.title || 'Компания',
        description: bonus?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="bonus">
                <div className="container">
                    {loading && !bonus ? (
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
                            {bonus?.AcfBonus?.descriptionAnons && (
                                <div className="bonus-block-top">
                                    <h1 className="bonus__title">{cleanHtmlFull(bonus?.AcfBonus?.titleLong || '')}</h1>
                                    <div className="bonus__anons">
                                        {bonus?.AcfBonus?.imageAnonsPage && (
                                            <div className="bonus__anons-img">
                                                <LightGallery
                                                    elementClassNames={'masonry-gallery-demo'}
                                                    plugins={[lgZoom, lgShare, lgHash]}
                                                    speed={500}
                                                >
                                                    <a href={bonus?.AcfBonus?.imageAnonsPage?.sourceUrl}>
                                                        <Image
                                                            src={bonus?.AcfBonus?.imageAnonsPage?.sourceUrl}
                                                            alt={bonus?.AcfBonus?.imageAnonsPage?.altText}
                                                            width={400}
                                                            height={400}
                                                            layout="intrinsic"
                                                        />
                                                    </a>
                                                </LightGallery>
                                            </div>
                                        )}
                                        <div className="bonus__anons-text"
                                             dangerouslySetInnerHTML={{__html: bonus?.AcfBonus?.descriptionAnons || ''}}>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className="block-bonuses">
                                {bonuses?.filter(el => el.node?.id !== bonus.id)
                                    .sort((a, b) => a.node?.menuOrder - b.node?.menuOrder)
                                    .map(item => (
                                        <div key={item?.node?.id}>
                                            <BlockItemBonus item={item}/>
                                        </div>
                                    ))}
                            </div>
                            {bonus?.content && (
                                <>
                                    <div className="bonus-block-center">
                                        <h2 className="bonus__title-main">{cleanHtmlFull(bonus?.AcfBonus?.titleCenter || '')}</h2>
                                        <div className="bonus__description">
                                            {bonus?.featuredImage?.node?.sourceUrl && (
                                                <div className="bonus__description-img">
                                                    <LightGallery
                                                        elementClassNames={'masonry-gallery-demo'}
                                                        plugins={[lgZoom, lgShare, lgHash]}
                                                        speed={500}
                                                    >
                                                        <a href={bonus?.featuredImage?.node?.sourceUrl}>
                                                            <Image
                                                                src={bonus?.featuredImage?.node?.sourceUrl || ''}
                                                                alt={bonus?.featuredImage?.node?.altText || ''}
                                                                width={400}
                                                                height={600}
                                                                layout="intrinsic"
                                                            />
                                                        </a>
                                                    </LightGallery>
                                                </div>
                                            )}
                                            <div className="bonus__description-text"
                                                 dangerouslySetInnerHTML={{__html: bonus?.content || ''}}>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            {bonus?.AcfBonus?.video && (
                                <div className="bonus-block-video">
                                    <h2
                                        className="bonus__title-video">{cleanHtmlFull(bonus?.AcfBonus?.videoTitle || '')}</h2>
                                    <div className="bonus__video">
                                        <div className="bonus__video-content"
                                             dangerouslySetInnerHTML={{__html: bonus?.AcfBonus?.video || ''}}>
                                        </div>
                                        <div className="bonus__video-text"
                                             dangerouslySetInnerHTML={{__html: bonus?.AcfBonus?.videoDescription || ''}}>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {bonus?.AcfBonus?.faqTitle && (
                                <div className="bonus-block-bottom">
                                    <h2 className="bonus__title-gallery">{cleanHtmlFull(bonus?.AcfBonus?.faqTitle || '')}</h2>
                                    <div className="bonus__gallery">
                                        <div className="bonus__gallery-content"
                                             dangerouslySetInnerHTML={{__html: bonus?.AcfBonus?.faqContent || ''}}>
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
    const {data} = await apolloClient.query({
        query: GET_BONUS_ALL
    });

    return {
        props: {
            initialData: data
        },
        revalidate: 2592000, // Revalidate every 30 days
    };
}


export default IndexBonus;



