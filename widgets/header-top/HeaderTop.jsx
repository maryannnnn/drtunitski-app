import React from 'react';
import './header-top.scss'
import './media.scss'
import Link from "next/link";
import Image from "next/image";
import DrawerMenu from "../../shared/drawer-menu/DrawerMenu";
import MenuMain from "../../shared/menu-main/MenuMain";
import {contactSalon} from "@/app/info/info";

const HeaderTop = () => {
    return (
        <div className='header-top'>
            <div className="header-top__inner">
                <div className='header-top__inner-logo'>
                    <Image
                        src="/images/logo/logo_3.png"
                        alt="Logo"
                        width={300}
                        height={59}
                        layout="responsive"
                        priority
                    />
                    <DrawerMenu/>
                </div>
                <div className='header-top__inner-menu'>
                    <MenuMain/>
                </div>
                <div className='header-top__inner-mobile'>
                    <Link href={`tel:${contactSalon.mobile}`} className="header-contact__mobile-link">
                        {contactSalon.mobile}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeaderTop;