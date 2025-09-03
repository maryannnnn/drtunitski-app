import React, {FC} from 'react';
import './footer.scss'
import './media.scss'
import FooterTop from "@/widgets/footer-top/FooterTop";
import FooterMiddle from "@/widgets/footer-middle/FooterMiddle";
import FooterBottom from "@/widgets/footer-bottom/FooterBottom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="footer__inner">
                <FooterTop/>
                <FooterMiddle/>
                <FooterBottom/>
            </div>
        </div>
    );
};

export default Footer;