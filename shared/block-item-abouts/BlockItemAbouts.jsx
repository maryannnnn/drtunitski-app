import './block-item-abouts.scss'
import './media.scss'
import Link from "next/link";
import Image from 'next/image';
import React from "react";
import {sizeText} from "../../app/info/info";
import {trimText} from "../utils/utils-content";

const BlockItemAbouts = ({item}) => {

    console.log("BlockItemAbouts item: ", item)

    return (
        <Link className='block-item-abouts'
              href={item?.node?.uri}>
            <div className="block-item-abouts__image">
                <div className="block-item-abouts__image-img">
                    <Image
                        src={item?.node?.AcfAbout?.imageAnons?.sourceUrl}
                        alt={item?.node?.AcfAbout?.imageAnons?.altText}
                        width={250}
                        height={250}
                        layout="intrinsic"
                    />
                </div>
                {item?.node?.title && (
                    <div className="block-item-abouts__image-title">{trimText(item?.node?.title, sizeText.xm)}</div>
                )}
                {/*{item?.node?.AcfAbout?.titleShort && (*/}
                {/*    <div*/}
                {/*        className="block-item-abouts__image-short">{trimText(item?.node?.AcfAbout?.titleShort, sizeText.xm)}</div>*/}
                {/*)}*/}
                {/*<div className="block-item-abouts__image-overlay"></div>*/}
            </div>
        </Link>
    )
}

export default BlockItemAbouts

