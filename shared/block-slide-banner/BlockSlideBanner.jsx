import './block-slide-banner.scss'
import './media.scss'
import Link from "next/link";
import {trimText} from "../utils/utils-content";
import {sizeText} from "../../app/info/info";
import {buttonOptions} from "../button-options/button-options";
import React from "react";
import {useRouter} from "next/router";
import ButtonRed from "../button-red/ButtonRed";

const BlockSlideBanner = ({item}) => {

    const router = useRouter();

    const postHandler = (url) => {
        router.push(url);
    }

    return (
        <div className="slide-info">
            <Link className="title" data-swiper-parallax="-300"  href={item.node.uri}>
                {trimText(item.node.title, sizeText.xb)}
            </Link>
            <div className="subtitle" data-swiper-parallax="-200">
                {trimText(item.node.AcfBonus.titleShort, sizeText.xt)}
            </div>
            <ButtonRed name={buttonOptions.detail} type="submit" onClick={() => postHandler(item.node.uri)} />
        </div>
    )
}

export  default BlockSlideBanner