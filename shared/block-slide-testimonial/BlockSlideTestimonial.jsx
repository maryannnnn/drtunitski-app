import './block-slide-testimonial.scss'
import './media.scss'
import Link from "next/link";
import Image from 'next/image';
import React, {useEffect, useState} from "react";
import {trimText, trimTextFullCleanedHTML} from "../utils/utils-content";
import {sizeText} from "../../app/info/info";

const BlockSlideTestimonial = ({item}) => {

    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;


    // Используем uri из GraphQL, но заменяем /testimonial/ на /stories/
    const uri = item?.node?.uri;
    const href = uri ? uri.replace('/testimonial/', '/stories/') : '#';

    return (
        <Link className="block-testimonial" href={href}>
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

