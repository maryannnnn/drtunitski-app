import './bonus-block.scss'
import './media.scss'
import Link from "next/link";
import React from "react";

const BASIS_URL_MAIN = process.env.BASIS_URL_MAIN

const BonusBlock = ({item}) => {

    return (
        <Link className="bonus-block"
              href={item.node.uri}>
            <div className="image-container">
                <img src={`${BASIS_URL_MAIN}/${item.node.AcfBonus.imageAnons.uri}`} alt={item.node.AcfBonus.imageAnons.altText}/>
                <div className="bonus-block-title">{item.node.title}</div>
                <div className="bonus-block-title-short">{item.node.AcfBonus.titleShort}</div>
                <div className="overlay"></div>
            </div>

        </Link>
    )
}

export default BonusBlock

