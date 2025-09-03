import React from 'react';
import './footer-middle.scss'
import './media.scss'
import FooterMenuSoc from "@/shared/footer-menu-soc/FooterMenuSoc";

const FooterMiddle= () => {
    return (
        <div className='footer-middle'>
            <div className='container'>
                <div className='footer-middle__inner'>
                   <FooterMenuSoc/>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default FooterMiddle;