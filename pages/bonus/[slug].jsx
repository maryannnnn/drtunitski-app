import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import { useTranslation } from 'next-i18next';
import { filterByLanguage } from '../../shared/utils/language-filter';
import VideoDisplay from '../../shared/video-display/VideoDisplay';
import {useQuery} from "@apollo/client";
import {GET_BONUS_BY_SLUG, GET_BONUS_ALL} from "../../entities/bonus/actions/bonusActions";
import apolloClient from "../../app/graphql/apollo-client";
import React from "react";
import LeftLayout from "../../app/layouts/LeftLayout";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../shared/breadcrumbs-page/BreadcrumbsPage";
import ContactUsBlock from '../../shared/contact-us-block/ContactUsBlock';

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";

const BonusPage = ({initialData}) => {
    const router = useRouter();
    const {slug} = router.query;

    const {loading, error, data} = useQuery(GET_BONUS_BY_SLUG, {
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

    const bonus = data?.bonusBy || initialData?.bonusBy;

    const typeMaterial = "bonus"

    const PageProps = {
        title: bonus?.seo?.title || 'Компания',
        description: bonus?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="bonus">
                <div className="container">
                    <>
                        {bonus?.AcfBonus?.descriptionAnons && (
                            <>
                                <h1 className="bonus__title">{cleanHtmlFull(bonus?.AcfBonus?.titleLong || '')}</h1>
                                <Breadcrumbs material={bonus} typeMaterial={typeMaterial}/>
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
                                                        alt={cleanHtmlFull(bonus?.AcfBonus?.titleLong || '')}
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
                            </>
                        )}
                        {bonus?.content && (
                            <>
                                <div className="bonus-block-center">
                                    <div className="container">
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
                                                                src={bonus?.featuredImage?.node?.sourceUrl}
                                                                alt={cleanHtmlFull(bonus?.AcfBonus?.titleCenter || '')}
                                                                width={400}
                                                                height={400}
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
                                </div>
                            </>
                        )}
                        {bonus?.AcfBonus?.video && (
                            <div className="bonus__video">
                                <h2 className="bonus__title-video">{cleanHtmlFull(bonus?.AcfBonus?.videoTitle || '')}</h2>
                                <div className="bonus__video-content">
                                    <VideoDisplay
                                        videoUrl={bonus?.AcfBonus?.video}
                                        title={cleanHtmlFull(bonus?.AcfBonus?.videoTitle || '')}
                                    />
                                </div>
                                <div className="bonus__video-text"
                                     dangerouslySetInnerHTML={{__html: bonus?.AcfBonus?.videoDescription || ''}}>
                                </div>
                            </div>
                        )}
                        {bonus?.AcfBonus?.faqContent && (
                            <div className="bonus-block-bottom">
                                <div className="container">
                                    <h2 className="bonus__title-faq">{cleanHtmlFull(bonus?.AcfBonus?.faqTitle || '')}</h2>
                                    <div className="bonus__faq">
                                        <div className="bonus__faq-content"
                                             dangerouslySetInnerHTML={{__html: bonus?.AcfBonus?.faqContent || ''}}>
                                        </div>
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
    console.log("⚠️ ISR enabled: bonus pages generated on-demand");
    return {
        paths: [],
        fallback: true
    };
}

export async function getStaticProps({params, locale}) {
    try {
        const {data} = await apolloClient.query({
            query: GET_BONUS_BY_SLUG,
            variables: {slug: params.slug},
        });

        return {
            props: {
                initialData: data,
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) => 
                    serverSideTranslations(locale, ['common'])
                )),
            },
            revalidate: 86400, // 24 hours
        };
    } catch (error) {
        console.error("Error fetching bonus:", error);
        return {
            props: {
                initialData: { bonusBy: null },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) => 
                    serverSideTranslations(locale, ['common'])
                )),
            },
            revalidate: 3600,
        };
    }
}

export default BonusPage;




