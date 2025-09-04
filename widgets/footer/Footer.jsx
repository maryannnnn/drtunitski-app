import React, {FC} from 'react';
import './footer.scss'
import './media.scss'
import FooterContact from "../../shared/footer-contact/FooterContact";
import FooterMenuSoc from "@/shared/footer-menu-soc/FooterMenuSoc";
import FooterCopyright from "../../shared/footer-copyright/FooterCopyright";

const Footer = () => {
    return (
        <div className="footer">
            <div className='container'>
                <div className="footer__inner">
                    <div className="footer__inner-column">
                        {/*<FooterContact/>*/}
                        {/*<FooterMenuSoc/>*/}
                    </div>
                    <div className="footer__inner-column">

                    </div>

                </div>
                <FooterCopyright/>
            </div>
        </div>
    );
};

export default Footer;