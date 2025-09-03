import './main-bonus.scss'
import './media.scss'
import React from "react";
import MainTemplate from "../main-template/MainTemplate";
import {numberItems, contentType} from "../../app/info/info";

const MainBonus = ({data}) => {

    console.log("MainBonus data: ", data);

    return (
        <div className="main-bonus">
            <div className="container">
                <MainTemplate
                    data={data}
                    number={numberItems.numberFour}
                    typeContent={contentType.bonuses}
                />
            </div>
        </div>
    );
};

export default MainBonus

