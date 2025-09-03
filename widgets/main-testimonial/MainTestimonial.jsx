import './main-testimonial.scss'
import './media.scss'
import React, {useRef, useState} from 'react';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// import required modules
import {Navigation, Pagination, Mousewheel, Keyboard} from 'swiper/modules';
import theme from "../../material.config";
import BlockSlideTestimonial from "../../shared/block-slide-testimonial/BlockSlideTestimonial";
import BlockHeader from "../../shared/block-header/BlockHeader";
import Link from "next/link";
import {buttonOptions} from "../../shared/button-options/button-options";

const MainTestimonial = ({data, type}) => {

    console.log("MainTestimonial data: ", data);

    const typeCategory = 'category4';

    const testimonials = data?.testimonials?.edges?.length ? data.testimonials.edges : [];

    return (
        <>
            <div className='main-testimonial'>
                <div className='container'>
                    {type === 'Отзывы' && (
                        <BlockHeader
                            title={data[typeCategory]?.AcfCategory?.categoryTitleLong1 || ''}
                            content={data[typeCategory]?.AcfCategory?.categoryDescriptionAnons || ''}
                            typeCategory={typeCategory}
                        />
                    )}
                    {testimonials.length > 0 ? (
                        <Swiper
                            style={{
                                '--swiper-navigation-color': theme.palette.secondary.contrastText,
                                '--swiper-pagination-color': theme.palette.secondary.contrastText,
                            }}
                            speed={600}
                            cssMode={true}
                            navigation={true}
                            slidesPerView={1.5}
                            spaceBetween={10}
                            centeredSlides={true}
                            pagination={{
                                clickable: true,
                            }}
                            mousewheel={true}
                            keyboard={true}
                            modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                            className="mySwiper"
                        >
                            {testimonials.length > 0 && testimonials
                                .filter(el =>
                                    el?.node?.categories?.edges &&
                                    el.node.categories.edges.some(category => category?.node?.name === type)
                                )
                                .slice(0, 7)
                                .map(el => (
                                    <SwiperSlide key={el?.node?.id}>
                                        <BlockSlideTestimonial item={el}/>
                                    </SwiperSlide>
                                ))
                            }

                        </Swiper>
                    ) : (
                        <p>No testimonials available at the moment.</p> // Фallback в случае отсутствия отзывов
                    )}
                    <div className='main-testimonial__block'>
                        <Link className='main-testimonial__block-link' href='/testimonial'>
                            {buttonOptions.see}
                        </Link>
                    </div>
                </div>
            </div>
            <div className='main-testimonial-mobile'>
                <div className='container'>
                    {type === 'Отзывы' && (
                        <BlockHeader
                            title={data[typeCategory]?.AcfCategory?.categoryTitleLong1 || ''}
                            content={data[typeCategory]?.AcfCategory?.categoryDescriptionAnons || ''}
                            typeCategory={typeCategory}
                        />
                    )}
                    {testimonials.length > 0 && testimonials
                        .filter(el =>
                            el?.node?.categories?.edges &&
                            el.node.categories.edges.some(category => category?.node?.name === type)
                        )
                        .slice(0, 7)
                        .map(el => (
                            <SwiperSlide key={el?.node?.id}>
                                <BlockSlideTestimonial item={el}/>
                            </SwiperSlide>
                        ))
                    }
                    <div className='main-testimonial__block'>
                        <Link className='main-testimonial__block-link' href='/testimonial'>
                            {buttonOptions.see}
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainTestimonial;

