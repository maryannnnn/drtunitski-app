import React, {useEffect, useState} from 'react';
import '../../app/scss/app.scss';
import './index.scss';
import './media.scss';
import Link from "next/link";
import LeftLayout from "../../app/layouts/LeftLayout";
import {useQuery} from "@apollo/client";
import apolloClient from '../../app/graphql/apollo-client';
import {GET_TESTIMONIAL_ALL} from "../../entities/testimonial/actions/testimonialActions";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import Image from "next/image";
import {cleanHtml, cleanHtmlFull, trimTextFullCleanedHTML} from "../../shared/utils/utils-content";
import BlockSlideTestimonial from "../../shared/block-slide-testimonial/BlockSlideTestimonial";
import Pagination from "../../shared/paginagion/Pagination";
import FilterTestimonial from "../../shared/filter-testimonial/FilterTestimonial";

const IndexTestimonial = ({initialData}) => {
    const [isClient, setIsClient] = useState(false);
    const [filters, setFilters] = useState({title: '', categoryId: 'All', itemsPerPage: 5})
    const [filteredTestimonials, setFilteredTestimonials] = useState([])

    const {loading, error, data} = useQuery(GET_TESTIMONIAL_ALL, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network",
    });

    const testimonial = data?.testimonial || initialData?.testimonial;
    const testimonials = data?.testimonials?.edges || initialData?.testimonials?.edges || [];

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (!testimonials || testimonials.length === 0) {
            console.log("Нет отзывов для фильтрации");
            return;
        }

        const filtered = testimonials.filter(item => {
            // Сравниваем название отзыва
            const titleMatches = item?.node?.title?.toLowerCase().includes(filters?.title?.toLowerCase().trim());

            // Проверяем наличие категорий у отзыва и фильтруем по категории
            const categoryMatches = filters?.categoryId === 'All' ||
                (item?.node?.categories?.edges && item?.node?.categories?.edges?.some(categoryEdge => {
                    const categoryName = categoryEdge?.node?.name?.toLowerCase().trim();
                    const filterCategoryId = filters?.categoryId?.toLowerCase().trim();

                    console.log("Категория отзыва:", categoryName);
                    console.log("Выбранная категория:", filterCategoryId);

                    return categoryName === filterCategoryId;
                }));

            // Логируем результаты фильтрации
            console.log("Совпадение по названию:", titleMatches);
            console.log("Совпадение по категории:", categoryMatches);

            return titleMatches && categoryMatches;
        });

        console.log("Отфильтрованные отзывы:", filtered);
        setFilteredTestimonials(filtered);
    }, [filters, testimonials]);




    const reviewsPerPage = filters.itemsPerPage; // Количество отзывов на странице
    const totalReviews = testimonials.length; // Общее количество отзывов
    const totalPages = Math.ceil(totalReviews / reviewsPerPage) // Рассчет количества страниц
    const [currentPage, setCurrentPage] = useState(1);

    // Получение отзывов для текущей страницы
    const getCurrentPageReviews = (currentPage) => {
        const startIndex = (currentPage - 1) * reviewsPerPage;
        const endIndex = startIndex + reviewsPerPage;
        return filteredTestimonials.slice(startIndex, endIndex);
    };

    const currentReviews = getCurrentPageReviews(currentPage);

    const PageProps = {
        title: testimonial?.seo?.title || 'Компания',
        description: testimonial?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="testimonial">
                <div className="container">
                    {loading && !testimonial ? (
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
                            <h1 className="testimonial__title">{cleanHtmlFull(testimonial?.AcfTestimonial?.titleLong || '')}</h1>
                            <div className="testimonial__anons-text"
                                 dangerouslySetInnerHTML={{__html: testimonial?.AcfTestimonial?.descriptionAnons || ''}}>
                            </div>
                            <div className="testimonial__filter">
                                <FilterTestimonial filter={filters} setFilter={setFilters}/>
                            </div>
                            <div className="block-testimonials">
                                {currentReviews?.length > 0 && currentReviews.filter(el => el.node?.id !== testimonial.id)
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

export async function getStaticProps() {
    const {data} = await apolloClient.query({
        query: GET_TESTIMONIAL_ALL
    });

    console.log("Fetched data:", data);

    return {
        props: {
            initialData: data
        },
        revalidate: 2592000, // Revalidate every 30 days
    };
}

export default IndexTestimonial;



