import './block-item-bonus.scss'
import './attributes-bonus.scss'
import './media.scss'
import Link from "next/link";
import Image from 'next/image';
import React from "react";
import {sizeText} from "../../app/info/info";
import {trimText} from "../utils/utils-content";

const BlockItemBonus = ({item}) => {

    console.log("BlockItemSalons item: ", item)

    return (
        <Link className='attributes__bonus-block' href={item?.node?.uri}>
            <div className="attributes__bonus-block-title">{trimText(item?.node?.title, sizeText.xb)}</div>
            <div
                className="attributes__bonus-block-text">{trimText(item?.node?.AcfBonus?.titleShort, sizeText.xb)}</div>
        </Link>
    )
}

export default BlockItemBonus

