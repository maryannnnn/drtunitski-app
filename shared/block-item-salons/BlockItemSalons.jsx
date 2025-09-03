import './block-item-salons.scss'
import './media.scss'
import Link from "next/link";
import Image from 'next/image';
import React from "react";
import {sizeText} from "../../app/info/info";
import {trimText} from "../utils/utils-content";

const BlockItemSalons = ({item}) => {

    console.log("BlockItemSalons item: ", item)

    return (
        <Link className='block-item-salons'
              href={item?.node?.uri}>
            <div className="block-item-salons__image">
                <div className="block-item-salons__image-img">
                    <Image
                        src={item?.node?.AcfSalon?.imageAnons?.sourceUrl}
                        alt={item?.node?.AcfSalon?.imageAnons?.altText}
                        width={250}
                        height={250}
                        layout="intrinsic"
                    />
                </div>
                {item?.node?.title && (
                    <div className="block-item-salons__image-title">{trimText(item?.node?.title, sizeText.xm)}</div>
                )}
                {/*{item?.node?.AcfSalon?.titleShort && (*/}
                {/*    <div*/}
                {/*        className="block-item-salons__image-short">{trimText(item?.node?.AcfSalon?.titleShort, sizeText.xm)}</div>*/}
                {/*)}*/}
                {/*<div className="block-item-salons__image-overlay"></div>*/}
            </div>
        </Link>
    )
}

export default BlockItemSalons

