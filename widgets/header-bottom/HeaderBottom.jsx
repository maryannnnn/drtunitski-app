import React from 'react';
import './header-button.scss'
import MenuMain from "../../shared/menu-main/MenuMain";
import DrawerMenu from "../../shared/drawer-menu/DrawerMenu";

const HeaderBottom = () => {

    return (
        <div className='header-bottom'>
            <div className='container'>
                <div className='header-bottom__inner'>
                    <MenuMain/>
                </div>
            </div>
        </div>
    );
}

export default HeaderBottom
