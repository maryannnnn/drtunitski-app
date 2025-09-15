import React from 'react';
import './header.scss'
import './media.scss'
import Image from "next/image";
import DrawerMenu from "../../shared/drawer-menu/DrawerMenu";
import MenuMain from "../../shared/menu-main/MenuMain";
import Link from "next/link";
import {contactSalon} from "@/app/info/info";
import LanguageSwitcher from "../../shared/language-switcher/LanguageSwitcher";
import logoImage from "../../app/assets/images/logo/logo_3.png";
import mobileImage from "../../app/assets/images/mobile/mobile.png";

const Header = () => {
    return (
        <div className='header'>
            <div className="header__inner">
                <DrawerMenu/>
                <div className='header__inner-logo'>
                    <Link href="/">
                        <Image
                            src={logoImage}
                            alt="Logo"
                            width={243}
                            height={48}
                            priority
                        />
                    </Link>
                </div>
                <div className='header__inner-menu'>
                    <MenuMain/>
                </div>
                <div className='header__inner-language'>
                    <LanguageSwitcher variant="dropdown" showLabel={false} />
                </div>
                <div className='header__inner-mobile'>
                    <div className='header__inner-mobile__image'>
                        <Link href={`tel:${contactSalon.mobile}`} className="header__inner-mobile__number-link">
                            <Image
                                src={mobileImage}
                                alt="mobile"
                                width={12}
                                height={24}
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
