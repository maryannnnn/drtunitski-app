import './media.scss'
import './attributes-price.scss'
import ButtonRed from "../button-red/ButtonRed";
import {buttonOptions} from "../button-options/button-options";
import React from "react";
import ButtonBrown from "../button-brown/ButtonBrown";

const AttributesPrice = ({attributesArrayPrice, contentType}) => {

    const massageHandler = () => {
        window.open('https://wa.me/972504246045', '_blank');
    }

    const courseHandler = () => {
        window.open('https://wa.me/972504246045', '_blank');
    }

    return (
        <div className="attributes__price">
            <div className="attributes__price-info">
                {attributesArrayPrice.length > 0 &&
                attributesArrayPrice.map(item =>
                    item.value && (
                        <div className="attributes__price-info__element">
                            <div
                                className="attributes__price-info__element-title">{item?.title}: &nbsp;</div>
                            <div
                                className="attributes__price-info__element-text">{item?.value}&#8362;</div>
                        </div>
                    )
                )}
            </div>
            <div className="attributes__price-button">
                {contentType && contentType === 'massages' ?
                    (<ButtonRed name={buttonOptions.massage} type="submit" onClick={massageHandler}/>)
                    : contentType && contentType === 'courses'
                        ? (<ButtonBrown name={buttonOptions.course} type="submit" onClick={courseHandler}/>)
                        : contentType && contentType === 'methodology'
                        ? (<ButtonRed name={buttonOptions.massage} type="submit" onClick={massageHandler}/>)
                            : contentType && contentType === 'procedure'
                                ? (<ButtonRed name={buttonOptions.massage} type="submit" onClick={massageHandler}/>)
                                : ''
                    }
            </div>
        </div>
    )
}

export default AttributesPrice