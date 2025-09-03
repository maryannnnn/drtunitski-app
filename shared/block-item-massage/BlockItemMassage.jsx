// import './block-item-massage.scss'
import './attributes-massage.scss'
import './media.scss'
import Link from "next/link";
import Image from 'next/image';
import React from "react";
import {trimText, trimTextFullCleanedHTML} from "../utils/utils-content";
import {sizeText} from "../../app/info/info";

const BlockItemMassage = ({item}) => {

    console.log("BlockItemMassage data: ", item);

    return (
        <Link className="attributes__massage-block" href={item?.node?.uri}>
            <div className="attributes__massage-block-title">{trimText(item?.node?.title, sizeText.xp)}</div>

            <div
                className="attributes__massage-block-text">{trimTextFullCleanedHTML(item?.node?.AcfMassage?.descriptionAnons, sizeText.xs)}</div>

        </Link>
    )
}

export default BlockItemMassage

