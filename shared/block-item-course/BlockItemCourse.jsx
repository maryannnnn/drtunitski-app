import './block-item-course.scss'
import './attributes-course.scss'
import './media.scss'
import Link from "next/link";
import Image from 'next/image';
import {BASIS_URL} from "../../app/config/config";
import React from "react";
import {trimTextFullCleanedHTML} from "../utils/utils-content";
import {sizeText} from "../../app/info/info";
import {buttonOptions} from "../button-options/button-options";
import ButtonRed from "../button-red/ButtonRed";
import {useRouter} from "next/router";

const BlockItemCourse = ({item}) => {

    const router = useRouter();

    const courseHandler = (url) => {
        router.push(url);
    }

    return (
        <>
            <Link className="attributes__course-block" href={item?.node?.uri}>
                <div className="block-item-course__info">
                     <div className="attributes__course-block-title">{item?.node?.title}</div>
                    <div className="attributes__course-block-text">
                        {trimTextFullCleanedHTML(item?.node?.AcfCourse?.descriptionAnons, sizeText.s)}
                    </div>
                    <ButtonRed name={buttonOptions.detail} type="submit"
                               onClick={() => courseHandler(item?.node?.uri)}/>
                </div>
            </Link>
        </>
    )
}

export default BlockItemCourse

