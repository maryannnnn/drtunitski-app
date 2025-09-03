import React, {useEffect} from 'react';
import './menu-soc.scss'
import './media.scss'
import Link from 'next/link';
import {menuSocIcons} from "@/shared/menu-soc/menu-soc-icons";

const MenuSoc = () => {

    return (
        <ul className='menu-soc'>
            {menuSocIcons
                .sort((a, b) => a.label - b.label)
                .map(link =>
                    <li  key={link.label}>
                        <Link className='menu-soc__item' href={link.url} target="blank" title={link.value}>
                            {link.component}
                        </Link>
                    </li>
                )
            }
        </ul>
    );
};

export default MenuSoc;