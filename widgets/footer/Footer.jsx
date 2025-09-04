import React, {FC} from 'react';
import './footer.scss'
import './media.scss'
import FooterMenuSoc from "@/shared/footer-menu-soc/FooterMenuSoc";
import FooterCopyright from "../../shared/footer-copyright/FooterCopyright";

const Footer = () => {
    return (
        <div className="footer">
            <div className='container'>
                <div className="footer__inner">
                    <FooterMenuSoc/>
                </div>
                <FooterCopyright/>
            </div>
        </div>
    );
};

export default Footer;