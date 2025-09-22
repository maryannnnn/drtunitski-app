import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import {useQuery} from "@apollo/client";
import {GET_POST_BY_SLUG, GET_POST_ALL} from "../../entities/post/actions/postActions";
import apolloClient from "../../app/graphql/apollo-client";
import React, {useEffect, useState} from "react";
import LeftLayout from "../../app/layouts/LeftLayout";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../shared/breadcrumbs-page/BreadcrumbsPage";
import {storyOptions} from "../../app/info/info";
import { useTranslation } from 'next-i18next';
import { filterByLanguage } from '../../shared/utils/language-filter';
import VideoDisplay from '../../shared/video-display/VideoDisplay';
import ButtonBrown from '../../shared/button-brown/ButtonBrown';
import Modal from '../../shared/modal/Modal';

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";

const BlogPage = ({initialData}) => {
    const { t } = useTranslation();
    const [isClient, setIsClient] = useState(false);
    const [isModalActive, setIsModalActive] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const router = useRouter();
    const {slug, locale} = router.query;

    console.log("Slug data: ", slug);

    const {loading, error, data} = useQuery(GET_POST_BY_SLUG, {
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

    if (!isClient) {
        return <div>Loading...</div>;
    }

    const post = data?.postBy || initialData?.postBy;

    const typeMaterial = "post"

    const PageProps = {
        title: post?.seo?.title || t('common:navigation.home'),
        description: post?.seo?.metaDesc || t('common:navigation.home')
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="blog">
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
                            <h1 className="blog__title">{cleanHtmlFull(post?.AcfPost?.titleLong || post?.title || 'Без названия')}</h1>
                            <Breadcrumbs material={post} typeMaterial={typeMaterial}/>
                            <div className="blog__personal">
                                <div
                                    className="blog__personal-name">{cleanHtmlFull(post?.AcfPost?.groupInfoPost?.fullName)}
                                </div>
                            </div>
                                <div className="blog__anons">
                                <div className="blog__anons-img">
                                    {post?.AcfPost?.imageAnons?.sourceUrl ? (
                                        <LightGallery
                                            elementClassNames={'masonry-gallery-demo'}
                                            plugins={[lgZoom, lgShare, lgHash]}
                                            speed={500}
                                        >
                                            <a href={post?.AcfPost?.imageAnons?.sourceUrl}>
                                                <Image
                                                    src={post.AcfPost.imageAnons.sourceUrl}
                                                    alt={cleanHtmlFull(post?.AcfPost?.titleLong || '')}
                                                    width={500}
                                                    height={400}
                                                    layout="intrinsic"
                                                />
                                            </a>
                                        </LightGallery>
                                    ) : post?.AcfPost?.groupInfoPost?.imageAuthor?.sourceUrl ? (
                                        <LightGallery
                                            elementClassNames={'masonry-gallery-demo'}
                                            plugins={[lgZoom, lgShare, lgHash]}
                                            speed={500}
                                        >
                                            <a href={post.AcfPost.groupInfoPost.imageAuthor.sourceUrl}>
                                                <Image
                                                    src={post.AcfPost.groupInfoPost.imageAuthor.sourceUrl}
                                                    alt={cleanHtmlFull(post?.AcfPost?.titleLong || '')}
                                                    width={150}
                                                    height={150}
                                                    layout="intrinsic"
                                                />
                                            </a>
                                        </LightGallery>
                                    ) : null}
                                </div>
                                    <div className="blog__anons-text"
                                     dangerouslySetInnerHTML={{__html: post?.AcfPost?.descriptionAnons || ''}}>
                                </div>
                            </div>
                            <div className="blog__appointment-btn">
                                <ButtonBrown
                                    onClick={() => setIsModalActive(true)}
                                    className="blog__appointment-button"
                                >
                                    {t('common:buttons.bookAppointment')}
                                </ButtonBrown>
                            </div>
                            {post?.content && (
                                <div className="blog-block-center">
                                    <div className="container">
                                        <h2 className="blog__title-main">{cleanHtmlFull(post?.AcfPost?.titleCenter)}</h2>
                                        <div className="blog__description">
                                            {post?.AcfPost?.imageAnons && (
                                                <div className="blog__description-img">
                                                    <LightGallery
                                                        elementClassNames={'masonry-gallery-demo'}
                                                        plugins={[lgZoom, lgShare, lgHash]}
                                                        speed={500}
                                                    >
                                                        <a href={post?.featuredImage?.node?.sourceUrl}>
                                                            <Image
                                                                src={post?.featuredImage?.node?.sourceUrl}
                                                                alt={cleanHtmlFull(post?.AcfPost?.titleCenter || '')}
                                                                width={500}
                                                                height={400}
                                                                layout="intrinsic"
                                                            />
                                                        </a>
                                                    </LightGallery>
                                                </div>
                                            )}
                                            <div className="blog__description-text"
                                                 dangerouslySetInnerHTML={{__html: post?.content}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            {post?.content && (
                                <div className="blog__appointment-btn">
                                    <ButtonBrown
                                        onClick={() => setIsModalActive(true)}
                                        className="blog__appointment-button"
                                    >
                                        {t('common:buttons.bookAppointment')}
                                    </ButtonBrown>
                                </div>
                            )}
                            {post?.AcfPost?.video && (
                                <div className="blog__video">
                                    <h2 className="blog__title-video">{cleanHtmlFull(post?.AcfPost?.videoTitle)}</h2>
                                    <div className="blog__video-content">
                                        <VideoDisplay
                                            videoUrl={post?.AcfPost?.video}
                                            title={cleanHtmlFull(post?.AcfPost?.videoTitle)}
                                            style={{ width: '500px', height: '281px' }}
                                            mobileStyle={{ width: '370px', height: '208px' }}
                                        />
                                    </div>
                                    <div className="blog__video-text"
                                         dangerouslySetInnerHTML={{__html: post?.AcfPost?.videoDescription}}>
                                    </div>
                                </div>
                            )}
                            {post?.AcfPost?.video && (
                                <div className="blog__appointment-btn">
                                    <ButtonBrown
                                        onClick={() => setIsModalActive(true)}
                                        className="blog__appointment-button"
                                    >
                                        {t('common:buttons.bookAppointment')}
                                    </ButtonBrown>
                                </div>
                            )}
                            {post?.AcfPost?.faqContent && (
                                <div className="blog-block-bottom">
                                    <div className="container">
                                        <h2 className="blog__title-faq">{cleanHtmlFull(post?.AcfPost?.faqTitle)}</h2>
                                        <div className="blog__faq">
                                            <div className="blog__faq-content"
                                                 dangerouslySetInnerHTML={{__html: post?.AcfPost?.faqContent}}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </>
                    )}
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
    try {
        const {data} = await apolloClient.query({
            query: GET_POST_ALL,
        });

        console.log("Fetched posts data: ", data);

        const paths = [];
        
        // Generate paths for each locale
        locales.forEach(locale => {
            const filteredPosts = filterByLanguage(data.posts.edges, locale);
            filteredPosts.forEach(item => {
                paths.push({
                    params: { slug: item.node.slug },
                    locale: locale
                });
            });
        });

        console.log("Generated paths: ", paths);

        return {paths, fallback: true};
    } catch (error) {
        console.error("Error fetching posts for static paths:", error);
        return {
            paths: [],
            fallback: true
        };
    }
}

export async function getStaticProps({params, locale}) {
    try {
        const {data} = await apolloClient.query({
            query: GET_POST_BY_SLUG,
            variables: {slug: params.slug},
        });

        return {
            props: {
                initialData: data || {
                    postBy: null
                },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) =>
                    serverSideTranslations(locale, ['common'])
                )),
            },
            //revalidate: 2592000, // Revalidate every 30 days
        };
    } catch (error) {
        console.error("Error fetching post:", error);
        return {
            props: {
                initialData: { postBy: null },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) =>
                    serverSideTranslations(locale, ['common'])
                )),
            },
        };
    }
}

export default BlogPage;




