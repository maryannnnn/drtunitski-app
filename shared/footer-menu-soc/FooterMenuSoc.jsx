import React from 'react';
import './footer-menu-soc.scss'
import './media.scss'
import {menuSocIcons} from "@/shared/menu-soc/menu-soc-icons";

const FooterMenuSoc = () => {
    return (
        <ul className='footer-menu-soc'>
            {menuSocIcons
                .sort((a, b) => a.label - b.label)
                .map(link =>
                    <li key={link.label}>
                        <span 
                            className='footer-menu-soc__item footer-menu-soc__item--disabled' 
                            title={link.value}
                            style={{ cursor: 'default' }}
                        >
                            {link.component}
                        </span>
                    </li>
                )
            }
        </ul>
    );
};

export default FooterMenuSoc;