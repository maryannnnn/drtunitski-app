import React, {FC} from 'react';
import './footer-bottom.scss'
import './media.scss'
import FooterCopyright from "@/shared/footer-copyright/FooterCopyright";

const FooterBottom = () => {
    return (
        <div className="footer-bottom">
            <div className="container">
                <div className="footer-bottom__inner">
                    <FooterCopyright/>
                </div>
            </div>
        </div>
    );
};

export default FooterBottom;