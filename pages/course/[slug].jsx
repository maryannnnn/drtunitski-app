import './index.scss';
import './media.scss';
import {useRouter} from 'next/router';
import {useQuery} from "@apollo/client";
import {GET_COURSE_BY_SLUG, GET_COURSE_ALL} from "../../entities/course/actions/courseActions";
import apolloClient from "../../app/graphql/apollo-client";
import React, {useEffect, useState} from "react";
import LeftLayout from "../../app/layouts/LeftLayout";
import Stack from "@mui/material/Stack";
import Alert from "@mui/material/Alert";
import {cleanHtmlFull} from "../../shared/utils/utils-content";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "../../shared/breadcrumbs-page/BreadcrumbsPage";
import {attributeTitleCourse, testimonialTitleCourse, testimonialType} from "../../app/info/info";
import AttributesCourse from "../../widgets/attributes-course/AtributesCourse";
import MainTestimonial from "../../widgets/main-testimonial/MainTestimonial";

import GalleryLightbox from "../../shared/gallegry-lightbox/GalleryLightbox";
import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";
const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";

const CoursePage = ({initialData}) => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const router = useRouter();
    const {slug} = router.query;

    const {loading, error, data} = useQuery(GET_COURSE_BY_SLUG, {
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

    if (!isClient) {
        return <div>Loading...</div>;
    }

    const course = data?.courseBy || initialData?.courseBy;
    const testimonials = data?.testimonials?.edges || initialData?.testimonials?.edges || [];

    const typeMaterial = "course"

    const PageProps = {
        title: course?.seo?.title || 'Компания',
        description: course?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="course">
                <div className="container">
                    <>
                        {course?.AcfCourse?.descriptionAnons && (
                            <>
                                <h1 className="course__title">{cleanHtmlFull(course?.AcfCourse?.titleLong || '')}</h1>
                                <Breadcrumbs material={course} typeMaterial={typeMaterial}/>
                                <div className="course__anons">
                                    {course?.AcfCourse?.imageAnonsPage && (
                                        <div className="course__anons-img">
                                            <LightGallery
                                                elementClassNames={'masonry-gallery-demo'}
                                                plugins={[lgZoom, lgShare, lgHash]}
                                                speed={500}
                                            >
                                                <a href={course?.AcfCourse?.imageAnonsPage?.sourceUrl}>
                                                    <Image
                                                        src={course?.AcfCourse?.imageAnonsPage?.sourceUrl}
                                                        alt={course?.AcfCourse?.imageAnonsPage?.altText || 'Image'}
                                                        width={400}
                                                        height={400}
                                                        layout="intrinsic"
                                                    />
                                                </a>
                                            </LightGallery>
                                        </div>
                                    )}
                                    <div className="course__anons-text"
                                         dangerouslySetInnerHTML={{__html: course?.AcfCourse?.descriptionAnons || ''}}>
                                    </div>
                                </div>
                            </>
                        )}
                        {course && (
                            <>
                                <h2 className="course__title-main">{attributeTitleCourse}</h2>
                                <AttributesCourse course={course}/>
                            </>
                        )}

                        {course?.galleryImages && course?.galleryImages?.length > 0 && (
                            <div className="course-block-gallery">
                                <h2 className="course__title-main">
                                    {cleanHtmlFull(course?.AcfCourse?.titleGallery || '')}
                                </h2>
                                <GalleryLightbox images={course?.galleryImages ?? []}/>
                            </div>
                        )}

                        {course?.content && (
                            <>
                                <div className="course-block-center">
                                    <h2 className="course__title-main">{cleanHtmlFull(course?.AcfCourse?.titleCenter || '')}</h2>
                                    <div className="course__description">
                                        {course?.featuredImage?.node?.sourceUrl && (
                                            <div className="course__description-img">
                                                <LightGallery
                                                    elementClassNames={'masonry-gallery-demo'}
                                                    plugins={[lgZoom, lgShare, lgHash]}
                                                    speed={500}
                                                >
                                                    <a href={course?.featuredImage?.node?.sourceUrl}>
                                                        <Image
                                                            src={course?.featuredImage?.node?.sourceUrl}
                                                            alt={course?.featuredImage?.node?.altText || 'Image'}
                                                            width={400}
                                                            height={400}
                                                            layout="intrinsic"
                                                        />
                                                    </a>
                                                </LightGallery>
                                            </div>
                                        )}
                                        <div className="course__description-text"
                                             dangerouslySetInnerHTML={{__html: course?.content || ''}}>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                        {course?.AcfCourse?.video && (
                            <div className="course-block-video">
                                <h2 className="course__title-video">{cleanHtmlFull(course?.AcfCourse?.videoTitle || '')}</h2>
                                <div className="course__video">
                                    <div className="course__video-content"
                                         dangerouslySetInnerHTML={{__html: course?.AcfCourse?.video || ''}}>
                                    </div>
                                    <div className="course__video-text"
                                         dangerouslySetInnerHTML={{__html: course?.AcfCourse?.videoDescription || ''}}>
                                    </div>
                                </div>
                            </div>
                        )}
                        {testimonials && testimonials?.length > 0 && (
                            <>
                                <h2 className="course__title-main">{testimonialTitleCourse}</h2>
                                <MainTestimonial data={data} type={testimonialType.course}/>
                            </>
                        )}
                        {course?.AcfCourse?.faqContent && (
                            <div className="course-block-bottom">
                                <h2 className="course__title-faq">{cleanHtmlFull(course?.AcfCourse?.faqTitle || '')}</h2>
                                <div className="course__faq">
                                    <div className="course__faq-content"
                                         dangerouslySetInnerHTML={{__html: course?.AcfCourse?.faqContent || ''}}>
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

export async function getStaticPaths() {
    const {data} = await apolloClient.query({
        query: GET_COURSE_ALL,
    });

    console.log("Fetched courses data: ", data);

    const paths = data.courses.edges.map(item => ({
        params: {slug: item.node.slug},
    }));

    console.log("Generated paths: ", paths);

    return {paths, fallback: true};
}

export async function getStaticProps({params}) {
    const {data} = await apolloClient.query({
        query: GET_COURSE_BY_SLUG,
        variables: {slug: params.slug},
    });

    return {
        props: {
            initialData: data,
        },
        //revalidate: 2592000, // Revalidate every 30 days
    };
}

export default CoursePage;




