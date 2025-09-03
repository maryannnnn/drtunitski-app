import React from 'react';
import './footer-menu-soc.scss'
import './media.scss'
import {menuSocIcons} from "@/shared/menu-soc/menu-soc-icons";
import Link from "next/link";

const FooterMenuSoc = () => {
    return (
        <ul className='footer-menu-soc'>
            {menuSocIcons
                .sort((a, b) => a.label - b.label)
                .map(link =>
                    <li key={link.label}>
                        <Link className='footer-menu-soc__item' href={link.url} target="blank" title={link.value}>
                            {link.component}
                        </Link>
                    </li>
                )
            }
        </ul>
    );
};

export default FooterMenuSoc;