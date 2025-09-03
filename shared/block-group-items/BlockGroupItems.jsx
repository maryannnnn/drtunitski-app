import './block-group-items.scss'
import './media.scss'
import BlockItemBonus from "../block-item-bonus/BlockItemBonus";
import React from "react";
import BlockItemMassage from "../block-item-massage/BlockItemMassage";
import BlockItemCourse from "../block-item-course/BlockItemCourse";
import BlockItemPost from "../block-item-post/BlockItemPost";
import {contentType} from "../../app/info/info";

const BlockGroupItems = ({data, number, typeContent}) => {

    console.log("BlockGroupItems dataAll: ", data)

    return (
        <ul className={`block-group-items${typeContent === contentType.massages ? '-massages' :
            typeContent === contentType.courses ? '-courses' : ''}`}>
            {
                data[typeContent]?.edges
                    .filter(el => el?.node?.categories?.edges && el.node.categories.edges.length > 0)
                    .sort((a, b) => a.node?.menuOrder - b.node?.menuOrder)
                    .slice(0, number)
                    .map((item) => (
                        <li key={item?.node?.id}>
                            {typeContent === contentType.bonuses ? (
                                <BlockItemBonus item={item}/>
                            ) : typeContent === contentType.massages ? (
                                <BlockItemMassage item={item}/>
                            ) : typeContent === contentType.courses ? (
                                <BlockItemCourse item={item}/>
                            ) : typeContent === contentType.posts ? (
                                <BlockItemPost item={item}/>
                            ) : (<div>...</div>)
                            }
                        </li>
                    ))
            }
        </ul>
    )
}

export default BlockGroupItems