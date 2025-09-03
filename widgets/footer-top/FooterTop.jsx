import React from 'react';
import './footer-top.scss'
import './media.scss'
import FooterContact from "../../shared/footer-contact/FooterContact";
import FooterMenuBlog from "../../shared/footer-menu-blog/FooterMenuBlog";
import FooterMenuService from "../../shared/footer-menu-service/FooterMenuService";
import FooterMenuCompany from "../../shared/footer-menu-company/FooterMenuCompany";

const FooterTop= () => {
    return (
        <div className='footer-top'>
            <div className='container'>
                <div className='footer-top__inner'>
                    <FooterContact/>
                    <FooterMenuService/>
                    <FooterMenuCompany/>
                    <FooterMenuBlog/>
                </div>
            </div>
        </div>
    );
};

export default FooterTop;