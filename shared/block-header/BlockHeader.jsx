import './block-header.scss'
import './media.scss'
import React from "react";
import {trimTextFullCleanedHTML} from "../utils/utils-content";
import {sizeText} from "../../app/info/info";

const BlockHeader = ({title, content, typeCategory = null}) => {

    return (
        <div className="block-header">
            <h2 className={`block-header__title${typeCategory === 'category3' ? '-white' : ''}`}>{title}</h2>
            <div
                className={`block-header__content${typeCategory === 'category3' ? '-white' : ''}`}>{trimTextFullCleanedHTML(content, sizeText.xp)}</div>
        </div>
    )
}

export default BlockHeader