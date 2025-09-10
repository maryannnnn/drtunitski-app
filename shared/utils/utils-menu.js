import Link from "next/link";
import React from "react";
import { Link as MuiLink} from '@mui/material';
import theme from "../../material.config";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

export const checkMenuItem = (linkId, menuMain) => {
    const menuUp = menuMain.filter(item => item.node.parentId === linkId);
    return menuUp.length > 0;
}

export const getMenuItems = (linkId, menuMain) => {

    return (
        <>
            {menuMain.filter(item => item.node.parentId === linkId)
               .sort((a, b) => a.node.order - b.node.order)
                .map(item => (
                        <MuiLink key={item.node.id} component={Link} href={item.node.path} sx={{
                            display: 'block',
                            color: theme.palette.primary.dark,
                            textDecoration: 'none',
                            '&:hover': {
                                textDecoration: 'none',
                                color: theme.palette.primary.light,
                            },
                            padding: '8px 16px',
                        }}>
                            {item.node.label}
                        </MuiLink>
                    )
                )
            }
        </>
    )
};

export const getMenuItemsMobile = (linkId, menuMain, isRTL = false, textAlign = 'left') => {
    return (
        <>
            {menuMain.filter(item => item.node.parentId === linkId)
                .sort((a, b) => a.node.order - b.node.order)
                .map(
                    (submenu) => {
                        // Если это заголовок колонки с columnItems
                        if (submenu.node.isColumnHeader && submenu.node.columnItems) {
                            return (
                                <div key={submenu.node.id}>
                                    {/* Заголовок колонки */}
                                    <ListItem
                                        sx={{
                                            padding: '8px 16px',
                                            backgroundColor: 'rgba(0, 0, 0, 0.05)',
                                            fontWeight: 'bold',
                                            fontSize: '14px',
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.5px',
                                            direction: isRTL ? 'rtl' : 'ltr',
                                            '& .MuiListItemText-primary': {
                                                textAlign: textAlign,
                                            },
                                        }}
                                    >
                                        <ListItemText primary={submenu.node.label} />
                                    </ListItem>
                                    {/* Элементы колонки */}
                                    {submenu.node.columnItems.map((columnItem) => (
                                        <ListItem
                                            key={columnItem.id}
                                            component="a"
                                            href={columnItem.path}
                                            sx={{
                                                display: 'block',
                                                color: theme.palette.primary.dark,
                                                textDecoration: 'none',
                                                direction: isRTL ? 'rtl' : 'ltr',
                                                transition: 'all 0.2s ease',
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    textDecoration: 'none !important',
                                                    color: '#E57900 !important', // Оранжевый цвет при наведении
                                                    backgroundColor: '#F6F6F6 !important', // Серый фон при наведении
                                                },
                                                padding: '1px 16px',
                                                paddingLeft: '32px', // Отступ для подэлементов
                                                '& .MuiListItemText-primary': {
                                                    textAlign: textAlign,
                                                },
                                                // Переопределяем стили Material-UI
                                                '&.MuiListItem-root:hover': {
                                                    backgroundColor: '#F6F6F6 !important', // Серый фон при наведении
                                                },
                                                '&.MuiListItem-root': {
                                                    '&:hover .MuiListItemText-primary': {
                                                        color: '#E57900 !important', // Оранжевый цвет при наведении
                                                    },
                                                },
                                            }}
                                        >
                                            <ListItemText primary={columnItem.label} />
                                        </ListItem>
                                    ))}
                                </div>
                            );
                        }
                        
                        // Обычные элементы подменю
                        return (
                            <ListItem
                                key={submenu.node.id}
                                component="a"
                                href={submenu.node.path}
                                sx={{
                                    display: 'block',
                                    color: theme.palette.primary.dark,
                                    textDecoration: 'none',
                                    direction: isRTL ? 'rtl' : 'ltr',
                                    transition: 'all 0.2s ease',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        textDecoration: 'none !important',
                                        color: '#E57900 !important', // Оранжевый цвет при наведении
                                        backgroundColor: '#F6F6F6 !important', // Серый фон при наведении
                                    },
                                    padding: '1px 16px',
                                    '& .MuiListItemText-primary': {
                                        textAlign: textAlign,
                                    },
                                    // Переопределяем стили Material-UI
                                    '&.MuiListItem-root:hover': {
                                        backgroundColor: '#F6F6F6 !important', // Серый фон при наведении
                                    },
                                    '&.MuiListItem-root': {
                                        '&:hover .MuiListItemText-primary': {
                                            color: '#E57900 !important', // Оранжевый цвет при наведении
                                        },
                                    },
                                }}
                            >
                                <ListItemText primary={submenu.node.label} />
                            </ListItem>
                        );
                    }
                )
            }
        </>
    )
};