import React, from 'react';
import Image from 'next/image';
// Import Swiper React components
import {Swiper, SwiperSlide} from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './main-banner.scss'
import './media.scss'

// import required modules
import {Parallax, Pagination, Navigation} from 'swiper/modules';
import theme from "../../material.config";
import BlockSlideBanner from "../../shared/block-slide-banner/BlockSlideBanner";

const MainBanner = ({ data }) => {

    return (
        <div className="main-banner">
            <Swiper
                style={{
                    '--swiper-navigation-color': theme.palette.secondary.contrastText,
                    '--swiper-pagination-color': theme.palette.secondary.contrastText,
                }}
                speed={600}
                parallax={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Parallax, Pagination, Navigation]}
                className="mySwiper-banner"
            >
                <div
                    slot="container-start"
                    className="parallax-bg"
                    style={{
                         'background-image': `url('/images/banners/banner_7.jpg')`,
                    }}
                    data-swiper-parallax="-23%"
                >
                </div>
                {data.bonuses?.edges
                    .filter(el => el?.node?.AcfBonus?.banner === true)
                    .map(item => (
                    <SwiperSlide key={item?.node?.id}>
                        <div className="container">
                            <BlockSlideBanner item={item} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default MainBanner

