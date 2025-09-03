import './block-item-post.scss'
import './media.scss'
import Link from "next/link";
import { useRouter } from 'next/router';
import {BASIS_URL} from "../../app/config/config";
import React from "react";
import {normalizeDatetime, trimText, trimTextFullCleanedHTML} from "../utils/utils-content";
import {sizeText} from "../../app/info/info";
import {buttonOptions} from "../button-options/button-options";
import ButtonRed from "../button-red/ButtonRed";
import Image from "next/image";

const BlockItemPost = ({item}) => {

    const router = useRouter();

    const postHandler = (url) => {
        router.push(url);
    }

    return (
        <div className='block-item-post'>
            <div className='block-item-post__img'>
                <Image
                    src={item?.node?.AcfPost?.imageAnons.sourceUrl}
                    alt={item?.node?.AcfPost?.imageAnons?.altText}
                    width={329}
                    height={237}
                    layout="intrinsic"
                />
            </div>
            {/*<img className='block-item-post__img' src={`${BASIS_URL}/${item?.node?.AcfPost?.imageAnons.uri}`}*/}
            {/*     alt={item?.node?.AcfPost?.imageAnons?.altText}/>*/}
            <div className="block-item-post__info">
                <div className="block-item-post__info-date">{normalizeDatetime(item?.node?.date)}</div>
                <ul className='block-item-post__info-category'>
                    {item?.node?.categories?.edges?.length > 0 && item?.node?.categories?.edges
                        .filter((el, index) => el?.node?.id !== 'dGVybToxMzM1' && index < 5)
                        .sort((a, b) => a?.node?.date - b?.node?.date)
                        .map(item => (
                            <Link className='block-item-post__info-category-link' href={item?.node?.uri}>
                                <li>{item?.node?.name}</li>
                            </Link>
                        ))
                    }
                </ul>
            </div>
            <Link className='block-item-post__title' href={item?.node?.uri}>
                {trimText(item?.node?.title, sizeText.xp)}
            </Link>
            <div
                className="block-item-post__anons">{trimTextFullCleanedHTML(item?.node?.AcfPost?.descriptionAnons, sizeText.xs)}</div>
            <ButtonRed name={buttonOptions.detail} type="submit" onClick={() => postHandler(item?.node?.uri)} />
        </div>
    )
}

export default BlockItemPost

