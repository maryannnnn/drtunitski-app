import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import { useTranslation } from 'next-i18next';
import { filterByLanguage } from '../../shared/utils/language-filter';
import {useQuery} from "@apollo/client";
import {GET_POST_BY_SLUG, GET_POST_ALL} from "../../entities/post/actions/postActions";
import apolloClient from "../../app/graphql/apollo-client";
import MainLayout from "../../app/layouts/MainLayout";
import React from "react";
import LeftLayout from "../../app/layouts/LeftLayout";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import Link from "next/link";
import Image from "next/image";

const BlogPage = ({initialData}) => {
    const router = useRouter();
    const {slug} = router.query;

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

    const post = data?.postBy || initialData?.postBy;

    const PageProps = {
        title: post?.title || 'Блог',
        description: 'Блог'
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
                            {post?.AcfPost?.descriptionAnons && (
                                <div className="blog__anons">
                                    <div className="blog__anons-text"
                                         dangerouslySetInnerHTML={{__html: post.AcfPost.descriptionAnons}}>
                                    </div>
                                </div>
                            )}
                            {post?.AcfPost?.titleCenter && (
                                <div className="blog-block-center">
                                    <h2 className="blog__title-main">{cleanHtmlFull(post.AcfPost.titleCenter)}</h2>
                                </div>
                            )}
                            {post?.content && (
                                <div className="blog__description">
                                    <div className="blog__description-text"
                                         dangerouslySetInnerHTML={{__html: post.content}}>
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

export async function getStaticPaths({ locales }) {
    const {data} = await apolloClient.query({
        query: GET_POST_ALL,
    });

    console.log("Fetched posts data: ", data);

    const paths = data.posts.edges.map(item => ({
        params: {slug: item.node.slug},
    }));

    console.log("Generated paths: ", paths);

    return {paths, fallback: true};
}

export async function getStaticProps({params, locale}) {
    try {
        const {data} = await apolloClient.query({
            query: GET_POST_BY_SLUG,
            variables: {slug: params.slug},
        });

        return {
            props: {
                initialData: data,
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




