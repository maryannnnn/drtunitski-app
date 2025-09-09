import React, {useEffect, useState} from 'react';
import './menu-nain-mobile.scss'
import './media.scss'
import {Box, CircularProgress, Stack, Alert, Button, Popover, Typography, Link as MuiLink} from '@mui/material';
import Link from "next/link";
import {checkMenuItem, getMenuItems, getMenuItemsMobile} from "../utils/utils-menu";
import menuMainMobile from '../menu-main/menuMain.json';
import theme from "../../material.config";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from "@mui/material/Collapse";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { useI18n } from "../hooks/useI18n";

const MenuMainMobile = ({ initialData }) => {
    const { data } = menuMainMobile;
    const { isRTL, textAlign } = useI18n();

    const [openSubmenus, setOpenSubmenus] = useState({}); // Состояние для подменю

    // Открытие/закрытие подменю
    const handleSubmenuToggle = (id) => (event) => {
        event.stopPropagation(); // Предотвращает закрытие Drawer или аккордеона
        setOpenSubmenus((prev) => ({
            ...prev,
            [id]: !prev[id], // Переключение состояния
        }));
    };

    return (
        <ul className="menu-main-mobile">
            {data.menuItems.edges.length > 0 ? (
                data.menuItems.edges
                    .filter((link) => link.node.parentId === null)
                    .sort((a, b) => a.node.order - b.node.order)
                    .map((link) => {
                        // Проверяем, есть ли у пункта подменю
                        const hasSubmenu = checkMenuItem(link.node.id, data.menuItems.edges);

                        return !hasSubmenu ? (
                                <ListItem
                                    key={link.node.id}
                                    button
                                    component="a"
                                    href={link.node.path}
                                    sx={{
                                        display: 'block',
                                        color: theme.palette.primary.dark,
                                        textDecoration: 'none',
                                        direction: isRTL ? 'rtl' : 'ltr', // Направление текста
                                        '&:hover': {
                                            textDecoration: 'none',
                                            color: theme.palette.primary.light,
                                        },
                                        padding: '1px 16px',
                                        '& .MuiListItemText-primary': {
                                            textAlign: textAlign, // Выравнивание текста
                                        },
                                    }}
                                >
                                    <ListItemText primary={link.node.label} />
                                </ListItem>

                        ) : (
                            <Accordion
                                key={link.node.id}
                                expanded={openSubmenus[link.node.id] || false} // Управление состоянием аккордеона
                                onChange={handleSubmenuToggle(link.node.id)} // Открытие/закрытие подменю
                                sx={{
                                    color: theme.palette.primary.dark,
                                    textDecoration: 'none',
                                    direction: isRTL ? 'rtl' : 'ltr', // Направление текста
                                    '&:hover': {
                                        textDecoration: 'none',
                                        color: theme.palette.primary.light,
                                    },
                                    padding: '1px 16px',
                                    '& .MuiAccordionSummary-content': {
                                        textAlign: textAlign, // Выравнивание текста
                                    },
                                }}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls={`panel-${link.node.id}-content`}
                                    id={`panel-${link.node.id}-header`}
                                >
                                    <Typography>{link.node.label}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {checkMenuItem(link.node.id, data.menuItems.edges) ? (
                                        <Collapse
                                            in={openSubmenus[link.node.id]}
                                            timeout="auto"
                                            unmountOnExit
                                        >
                                            {/* Рендеринг подменю */}
                                            {getMenuItemsMobile(link.node.id, data.menuItems.edges, isRTL, textAlign)}
                                        </Collapse>
                                    ) : (
                                        <Typography>Нет подменю</Typography>
                                    )}
                                </AccordionDetails>
                            </Accordion>
                        );
                    })
            ) : (
                <div className="">Нет ссылок</div>
            )}
        </ul>
    );
};

export async function getStaticProps() {
    // const { data } = await client.query({
    //     query: GET_MENU_MAIN
    // });

    const {data} = menuMainMobile

    return {
        props: {
            initialData: data
        }
    };
}

export default MenuMainMobile;

