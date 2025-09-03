import React from 'react';
import './header.scss'
import './media.scss'
import Image from "next/image";
import DrawerMenu from "../../shared/drawer-menu/DrawerMenu";
import MenuMain from "../../shared/menu-main/MenuMain";
import Link from "next/link";
import {contactSalon} from "@/app/info/info";

const Header = () => {
    return (
        <div className='header'>
            <div className="header__inner">
                <DrawerMenu/>
                <div className='header__inner-logo'>
                    <Link href="/">
                        <Image
                            src="/images/logo/logo_3.png"
                            alt="Logo"
                            width={243}
                            height={48}
                            layout="responsive"
                            priority
                        />
                    </Link>
                </div>
                <div className='header__inner-menu'>
                    <MenuMain/>
                </div>
                <div className='header__inner-mobile'>
                    <div className='header__inner-mobile__image'>
                        <Link href={`tel:${contactSalon.mobile}`} className="header__inner-mobile__number-link">
                            <Image
                                src="/images/mobile/mobile.png"
                                alt="mobile"
                                width={12}
                                height={24}
                                layout="responsive"
                                priority
                            />
                        </Link>
                    </div>
                    <div className='header__inner-mobile__number'>
                        <Link href={`tel:${contactSalon.mobile}`} className="header__inner-mobile__number-link">
                            {contactSalon.mobile}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
