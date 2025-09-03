import './main-massage.scss'
import './media.scss'
import MainTemplate from "../main-template/MainTemplate";
import {contentType, numberItems} from "../../app/info/info";
import React from "react";

const MainMassage = ({ data }) => {
    console.log("MainMassage data: ", data);

    return (
        <div className="main-massage">
            <div className="container">
                <MainTemplate
                    data={data}
                    number={numberItems.numberSeven}
                    typeContent={contentType.massages}
                />
            </div>
        </div>
    );
};

export default MainMassage

