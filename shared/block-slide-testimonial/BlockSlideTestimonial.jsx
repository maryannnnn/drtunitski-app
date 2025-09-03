import './block-slide-testimonial.scss'
import './media.scss'
import Link from "next/link";
import Image from 'next/image';
import React, {useEffect, useState} from "react";
import {trimText, trimTextFullCleanedHTML} from "../utils/utils-content";
import {sizeText, testimonialOptions} from "../../app/info/info";

const BlockSlideTestimonial = ({item}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;


    return (
        <Link className="block-testimonial" href={item?.node?.uri}>
            <h3 className="block-testimonial__title">{item?.node?.title}</h3>
            <div className="block-testimonial__author">
                <div className="block-testimonial__author-name">
                    {trimText(item?.node?.AcfTestimonial?.groupInfoPost?.fullName, sizeText.ma)}
                </div>
            </div>
            <div className="block-testimonial__text">
                {trimTextFullCleanedHTML(item?.node?.AcfTestimonial?.descriptionAnons, sizeText.m)}
            </div>
        </Link>
    );
}

export default BlockSlideTestimonial

