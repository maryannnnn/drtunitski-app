import React from "react";
import './medreviews-block.scss'

const MedreviewsBlock = () => {

    return (
        <div className="medreviews">
            <div className="container">
                <div className="medreviews-block">
                    <iframe frameBorder="0" height="270px" width="100%" allowFullScreen
                            src="https://www.medreviews.co.il/provider/dr-tunitski-sergei/reviews-widget?show-header=true&slide-switch-interval=4500&bg=ffffff&controls-color=&r-text-color=&date-color=&main-text=&only-favorite=&logo=">
                    </iframe>
                </div>
            </div>
        </div>
    );
};

export default MedreviewsBlock;