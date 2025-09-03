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
import {cleanHtml, cleanHtmlFull, trimTextFullCleanedHTML} from "../../shared/utils/utils-content";
import {GET_COURSE_ALL} from "../../entities/course/actions/courseActions";
import BlockItemCourse from "../../shared/block-item-course/BlockItemCourse";
import {testimonialTitleCourse, testimonialType} from "../../app/info/info";
import MainTestimonial from "../../widgets/main-testimonial/MainTestimonial";

import lgZoom from "lightgallery/plugins/zoom";
import lgShare from "lightgallery/plugins/share";
import lgHash from "lightgallery/plugins/hash";
import dynamic from "next/dynamic";

const LightGallery = dynamic(() => import("lightgallery/react"), {ssr: false});
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-share.css";

const IndexCourse = ({initialData}) => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const {loading, error, data} = useQuery(GET_COURSE_ALL, {
        fetchPolicy: "cache-first",
        nextFetchPolicy: "cache-and-network",
    });

    const course = data?.course || initialData?.course || {};
    const courses = data?.courses?.edges || initialData?.courses?.edges || [];
    const testimonials = data?.testimonials?.edges || initialData?.testimonials?.edges || [];

    const PageProps = {
        title: course?.seo?.title || 'Компания',
        description: course?.seo?.metaDesc || 'Компания'
    };

    return (
        <LeftLayout title={PageProps.title} description={PageProps.description}>
            <div className="course">
                <div className="container">
                    {loading && !course ? (
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
                            {course?.AcfCourse?.descriptionAnons && (
                                <div className="course-block-top">
                                    <h1 className="course__title">{cleanHtmlFull(course?.AcfCourse?.titleLong || '')}</h1>
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
                                                            alt={course?.AcfCourse?.imageAnonsPage?.altText}
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
                                </div>
                            )}
                            <div className="block-courses">
                                {courses?.filter(el => el.node?.id !== course.id)
                                    .sort((a, b) => a.node?.menuOrder - b.node?.menuOrder)
                                    .map((item, index) => (
                                        <div key={item?.node?.id || index}>
                                            <BlockItemCourse item={item}/>
                                        </div>
                                    ))}
                            </div>
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
                                                                src={course?.featuredImage?.node?.sourceUrl || ''}
                                                                alt={course?.featuredImage?.node?.altText || ''}
                                                                width={400}
                                                                height={600}
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
                                    <h2
                                        className="course__title-video">{cleanHtmlFull(course?.AcfCourse?.videoTitle || '')}</h2>
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
                            {course?.AcfCourse?.faqTitle && (
                                <div className="course-block-bottom">
                                    <h2 className="course__title-gallery">{cleanHtmlFull(course?.AcfCourse?.faqTitle || '')}</h2>
                                    <div className="course__gallery">
                                        <div className="course__gallery-content"
                                             dangerouslySetInnerHTML={{__html: course?.AcfCourse?.faqContent || ''}}>
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
        const {data} = await apolloClient.query({query: GET_COURSE_ALL});
        return {
            props: {initialData: data},
            // revalidate: 86400, // Пересборка каждый день
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {props: {initialData: {}}};
    }
}

export default IndexCourse;
