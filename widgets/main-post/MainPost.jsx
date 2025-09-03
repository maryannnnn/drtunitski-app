import './main-post.scss'
import './media.scss'
import MainTemplate from "../main-template/MainTemplate";
import {contentType, numberItems} from "../../app/info/info";
import React from "react";

const MainPost = ({ data }) => {

    console.log("MMainPost data: ", data);

    return (
        <div className="main-post">
            <div className="container">
                    <MainTemplate
                        data={data}
                        number={numberItems.numberThree}
                        typeContent={contentType.posts}
                    />
            </div>
        </div>
    );
};

export default MainPost

