import React, {useEffect, useState, useMemo} from 'react';
import '../../app/scss/app.scss';
import './index.scss';
import './media.scss';
import Link from "next/link";
import LeftLayout from "../../app/layouts/LeftLayout";
import {useQuery} from "@apollo/client";
import apolloClient from '../../app/graphql/apollo-client';
import {GET_STORY_ALL} from "../../entities/story/actions/storyActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import {cleanHtml, cleanHtmlFull, trimTextFullCleanedHTML} from "../../shared/utils/utils-content";
import BlockSlideTestimonial from "../../shared/block-slide-testimonial/BlockSlideTestimonial";
import Pagination from "../../shared/paginagion/Pagination";
import FilterTestimonial from "../../shared/filter-testimonial/FilterTestimonial";
import { useTranslation } from 'next-i18next';

const IndexStory = ({initialData}) => {
    const { t } = useTranslation();
    const [isClient, setIsClient] = useState(false);
    const [filters, setFilters] = useState({title: '', categoryId: 'All', itemsPerPage: 5})
    const [filteredStories, setFilteredStories] = useState([])

    const {loading, error, data} = useQuery(GET_STORY_ALL, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network",
    });

    const story = data?.story || initialData?.story;
    const stories = useMemo(() => {
        return data?.stories?.edges || initialData?.stories?.edges || [];
    }, [data?.stories?.edges, initialData?.stories?.edges]);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!stories || stories.length === 0) {
            // eslint-disable-next-line no-console
            if (process.env.NODE_ENV === 'development') {
                console.log("Нет историй для фильтрации");
            }
            return;
        }

        const filtered = stories.filter(item => {
            // Сравниваем название истории
            const titleMatches = item?.node?.title?.toLowerCase().includes(filters?.title?.toLowerCase().trim());

            // Проверяем наличие категорий у истории и фильтруем по категории
            const categoryMatches = filters?.categoryId === 'All' ||
                (item?.node?.categories?.edges && item?.node?.categories?.edges?.some(categoryEdge => {
                    const categoryName = categoryEdge?.node?.name?.toLowerCase().trim();
                    const filterCategoryId = filters?.categoryId?.toLowerCase().trim();

                    if (process.env.NODE_ENV === 'development') {
                        console.log("Категория истории:", categoryName);
                        console.log("Выбранная категория:", filterCategoryId);
                    }

                    return categoryName === filterCategoryId;
                }));

            // Логируем результаты фильтрации 
            if (process.env.NODE_ENV === 'development') {
                console.log("Совпадение по названию:", titleMatches);
                console.log("Совпадение по категории:", categoryMatches);
            }

            return titleMatches && categoryMatches;
        });

        if (process.env.NODE_ENV === 'development') {
            console.log("Отфильтрованные истории:", filtered);
        }
        setFilteredStories(filtered);
    }, [filters, stories]);




    const storiesPerPage = filters.itemsPerPage; // Количество историй на странице
    const totalStories = stories.length; // Общее количество историй
    const totalPages = Math.ceil(totalStories / storiesPerPage) // Рассчет количества страниц
    const [currentPage, setCurrentPage] = useState(1);

    // Получение историй для текущей страницы
    const getCurrentPageStories = (currentPage) => {
        const startIndex = (currentPage - 1) * storiesPerPage;
        const endIndex = startIndex + storiesPerPage;
        return filteredStories.slice(startIndex, endIndex);
    };

    const currentStories = getCurrentPageStories(currentPage);

    const PageProps = {
        title: story?.seo?.title || 'Истории',
        description: story?.seo?.metaDesc || 'Истории'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="story">
                <div className="container">
                    {loading && !story ? (
                        <div>...</div>
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
                            <h1 className="story__title">{cleanHtmlFull(story?.AcfStory?.titleLong || '')}</h1>
                            <div className="story__anons-text"
                                 dangerouslySetInnerHTML={{__html: story?.AcfStory?.descriptionAnons || ''}}>
                            </div>
                            <div className="story__filter">
                                <FilterTestimonial filter={filters} setFilter={setFilters}/>
                            </div>
                            <div className="block-stories">
                                {currentStories?.length > 0 && currentStories.filter(el => el.node?.id !== story.id)
                                    .map(item => (
                                        <div key={item?.id}>
                                            <BlockSlideTestimonial item={item} />
                                        </div>
                                    ))}
                            </div>
                            <Pagination totalPages={totalPages} currentPage={currentPage} setPageNumber={setCurrentPage} />
                        </>
                    )}
                </div>
            </div>
        </LeftLayout>
    );
};

export async function getStaticProps({ locale }) {
    try {
        const {data} = await apolloClient.query({
            query: GET_STORY_ALL
        });
        
        return {
            props: {
                initialData: data || {
                    story: null,
                    stories: { edges: [] }
                },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) =>
                    serverSideTranslations(locale, ['common'])
                )),
            },
            revalidate: 2592000,
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                initialData: {
                    story: null,
                    stories: { edges: [] }
                },
                ...(await import('next-i18next/serverSideTranslations').then(({ serverSideTranslations }) =>
                    serverSideTranslations(locale, ['common'])
                )),
            },
            revalidate: 60, // Retry in 1 minute
        };
    }
}

export default IndexStory;



