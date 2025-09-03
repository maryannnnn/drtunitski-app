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

export const getMenuItemsMobile = (linkId, menuMain) => {

    return (
        <>
            {menuMain.filter(item => item.node.parentId === linkId)
                .sort((a, b) => a.node.order - b.node.order)
                .map(
                    (submenu) => (
                        <ListItem
                            key={submenu.node.id}
                            button
                            component="a"
                            href={submenu.node.path}
                            sx={{
                                display: 'block',
                                color: theme.palette.primary.dark,
                                textDecoration: 'none',
                                '&:hover': {
                                    textDecoration: 'none',
                                    color: theme.palette.primary.light,
                                },
                                padding: '1px 16px',
                            }}
                        >
                            <ListItemText primary={submenu.node.label} />
                        </ListItem>
                    )
                )
            }
        </>
    )
};