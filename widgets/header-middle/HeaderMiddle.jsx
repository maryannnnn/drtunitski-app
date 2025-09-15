import React from 'react';
import './header-middle.scss'
import './media.scss'
import HeaderButtons from "@/shared/header-buttons/HeaderButtons";
import HeaderContact from "@/shared/header-contact/HeaderContact";
import Link from "next/link";
import Image from 'next/image';
import DrawerMenu from "../../shared/drawer-menu/DrawerMenu";
import logoImage from "../../app/assets/images/logo/logo_3.png";

const HeaderMiddle = () => {
    return (
        <div className='header-middle'>
            <div className="container">
                <div className="header-middle__inner">
                    <div className='header-middle__inner-logo'>
                        <Link href="/" className="header-middle__inner-logo-link">
                            <Image
                                src={logoImage}
                                alt="Logo"
                                width={343}
                                height={60}
                                priority
                            />
                        </Link>
                        <DrawerMenu/>
                    </div>
                    <div className='header-middle__inner-buttons'>
                        <HeaderButtons/>
                    </div>
                    <div className='header-middle__inner-contact'>
                        <HeaderContact/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderMiddle;