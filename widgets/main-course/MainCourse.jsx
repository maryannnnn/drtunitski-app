import './main-course.scss'
import './media.scss'
import MainTemplate from "../main-template/MainTemplate";
import {contentType, numberItems} from "../../app/info/info";
import React from "react";

const MainCourse = ({ data }) => {

    console.log("MainBonus data: ", data);

    return (
        <div className="main-course">
            <div className="container">
                    <MainTemplate
                        data={data}
                        number={numberItems.numberFour}
                        typeContent={contentType.courses}
                    />
            </div>
        </div>
    );
};

export default MainCourse

