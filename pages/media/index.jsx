import React from 'react';
import '../../app/scss/app.scss';
import './index.scss';
import './media.scss';
import Link from "next/link";
import LeftLayout from "../../app/layouts/LeftLayout";
import {useQuery} from "@apollo/client";
import apolloClient from '../../app/graphql/apollo-client';
import {GET_POST_ALL} from "../../entities/post/actions/postActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import {cleanHtml, cleanHtmlFull, trimTextFullCleanedHTML} from "../../shared/utils/utils-content";

const IndexBlog = ({initialData}) => {

    const {loading, error, data} = useQuery(GET_POST_ALL, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network",
    });

    const posts = data?.posts || initialData?.posts;

    console.log("Posts data:", posts);
    console.log("Loading:", loading);
    console.log("Error:", error);
    console.log("Posts edges:", posts?.edges);
    console.log("GraphQL URL:", process.env.NEXT_PUBLIC_BACKEND_API_URL);

    const PageProps = {
        title: 'Blog',
        description: 'Blog'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="blog">
                <div className="container">
                    {loading && !posts ? (
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
                            <h1 className="blog__title">Блог</h1>
                            <div>Debug: posts?.edges?.length = {posts?.edges?.length || 0}</div>
                            <div className="blog__list">
                                {posts?.edges && posts.edges.length > 0 ? posts.edges.map((item, index) => {
                                    if (!item?.node) return null;
                                    return (
                                        <div key={item.node.slug || index} className="blog__item">
                                            <Link href={`/media/${item.node.slug}`}>
                                                <div className="blog__item-content">
                                                    <div className="blog__item-text">
                                                        <h3 className="blog__item-title">
                                                            {cleanHtmlFull(item.node.AcfPost?.titleLong || item.node.title || 'Без названия')}
                                                        </h3>
                                                        {item.node.AcfPost?.descriptionAnons && (
                                                            <div className="blog__item-description"
                                                                 dangerouslySetInnerHTML={{__html: item.node.AcfPost.descriptionAnons}}>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                }) : <div>Нет постов для отображения</div>}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </LeftLayout>
    );
};

export async function getStaticProps() {
    try {
        console.log("GraphQL URL in getStaticProps:", process.env.NEXT_PUBLIC_BACKEND_API_URL);
        
        const {data} = await apolloClient.query({
            query: GET_POST_ALL
        });

        console.log("Fetched posts data:", data);

        // Ensure we always return valid data structure
        const initialData = data || {
            posts: {
                edges: []
            }
        };

        return {
            props: {
                initialData
            },
            //revalidate: 2592000, // Revalidate every 30 days
        };
    } catch (error) {
        console.error("Error fetching posts:", error);
        console.error("Error details:", error.message);
        console.error("Error network:", error.networkError);
        return {
            props: {
                initialData: { 
                    posts: { 
                        edges: [
                            {
                                node: {
                                    id: 'fallback-1',
                                    title: 'Сайт временно недоступен',
                                    slug: 'site-unavailable',
                                    excerpt: 'Попробуйте зайти позже',
                                    date: new Date().toISOString(),
                                    AcfPost: {
                                        titleLong: 'Сайт временно недоступен',
                                        descriptionAnons: 'Мы работаем над восстановлением доступа. Пожалуйста, попробуйте зайти позже.'
                                    }
                                }
                            }
                        ] 
                    } 
                }
            },
        };
    }
}

export default IndexBlog;



