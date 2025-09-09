import React, { useState } from 'react';
import './menu-nain.scss';
import './media.scss';
import Link from "next/link";
import {checkMenuItem} from "../utils/utils-menu";
import menuMain from './menuMain.json';

const MenuMain = () => {
    const {data} = menuMain;
    const [activeMenu, setActiveMenu] = useState(null);

    // Функция для получения дочерних элементов меню
    const getChildItems = (parentId) => {
        return data.menuItems.edges
            .filter((item) => item.node.parentId === parentId)
            .sort((a, b) => a.node.order - b.node.order);
    };

    const handleMouseEnter = (menuId) => {
        setActiveMenu(menuId);
    };

    const handleMouseLeave = () => {
        setActiveMenu(null);
    };

    return (
        <nav className="navigation-menu">
            <ul className="navigation-menu-list">
                {data.menuItems.edges
                    .filter((link) => link.node.parentId === null)
                    .sort((a, b) => a.node.order - b.node.order)
                    .map((link) => {
                        const hasChildren = checkMenuItem(link.node.id, data.menuItems.edges);
                        const childItems = hasChildren ? getChildItems(link.node.id) : [];
                        const isActive = activeMenu === link.node.id;

                        // Определяем, нужно ли многоколоночное меню
                        const isThreeColumnMenu = link.node.label === "Gynecology";
                        const isTwoColumnMenu = link.node.label === "Surgery";
                        
                        return (
                            <li 
                                key={link.node.id} 
                                className="navigation-menu-item"
                                onMouseEnter={() => hasChildren && handleMouseEnter(link.node.id)}
                                onMouseLeave={handleMouseLeave}
                            >
                                {hasChildren ? (
                                    <>
                                        <button className="navigation-menu-trigger">
                                            {link.node.label}
                                        </button>
                                        {isActive && (
                                            <div className={`navigation-menu-content ${isThreeColumnMenu ? 'navigation-menu-content--three-column' : ''}`}>
                                                {isThreeColumnMenu ? (
                                                    // Новая структура для Gynecology с заголовками колонок
                                                    <div className="navigation-menu-columns">
                                                        {childItems.map((column) => (
                                                            <div key={column.node.id} className="navigation-menu-column">
                                                                <h3 className="navigation-menu-column-header">
                                                                    {column.node.label}
                                                                </h3>
                                                                <ul className="navigation-menu-column-list">
                                                                    {column.node.columnItems.map((item) => (
                                                                        <li key={item.id} className="navigation-menu-column-item">
                                                                            <Link 
                                                                                href={item.path} 
                                                                                className="navigation-menu-link"
                                                                            >
                                                                                {item.label}
                                                                            </Link>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ))}
                                                    </div>
                                                ) : (
                                                    // Стандартная структура для других меню
                                                    <ul className={`navigation-menu-content-list ${isTwoColumnMenu ? 'navigation-menu-content-list--two-column' : ''}`}>
                                                        {childItems.map((child) => (
                                                            <li key={child.node.id} className="navigation-menu-content-item">
                                                                <Link 
                                                                    href={child.node.path} 
                                                                    className="navigation-menu-link"
                                                                >
                                                                    {child.node.label}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <Link 
                                        href={link.node.path} 
                                        className="navigation-menu-link"
                                    >
                                        {link.node.label}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
            </ul>
        </nav>
    );
};


export default MenuMain;




