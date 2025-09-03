import React, {useEffect, useState} from 'react';
import './menu-nain.scss'
import './media.scss'
import {Box, CircularProgress, Stack, Alert, Button, Popover, Paper, Typography, Link as MuiLink} from '@mui/material';
import Link from "next/link";
import {checkMenuItem, getMenuItems} from "../utils/utils-menu";
import menuMain from './menuMain.json';
import theme from "../../material.config";

const MenuMain = ({initialData}) => {

    const {data} = menuMain

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // const { loading, error, data } = useQuery(GET_MENU_MAIN, {
    //     initialData: initialData
    // });
    const [anchorEl, setAnchorEl] = useState(null);
    const [activeLink, setActiveLink] = useState(null);

    const handleMenuOpen = (event, linkId) => {
        setAnchorEl(event.currentTarget);
        setActiveLink(linkId);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setActiveLink(null);
    };

    const handleMouseEnter = (event, linkId) => {
        setAnchorEl(event.currentTarget);
        setActiveLink(linkId);
    };

    const handleMouseLeave = () => {
        setAnchorEl(null);
        setActiveLink(null);
    };


    return (
        <ul className="menu-main">
            {data.menuItems.edges.length > 0 ? (
                data.menuItems.edges
                    .filter((link) => link.node.parentId === null)
                    .sort((a, b) => a.node.order - b.node.order)
                    .map((link) => (
                        <li
                            key={link.node.id}
                            onMouseEnter={(event) => handleMouseEnter(event, link.node.id)}
                            onMouseLeave={handleMouseLeave}
                        >
                            <Button
                                aria-controls={activeLink === link.node.id ? `menu-${link.node.id}` : undefined}
                                aria-haspopup="true"
                                onClick={(event) => handleMenuOpen(event, link.node.id)}
                                sx={{
                                    color: theme.palette.primary.dark,
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'none',
                                        color: theme.palette.primary.light,
                                    },
                                }}
                            >
                                <MuiLink component={Link} href={link.node.path} sx={{
                                    color: theme.palette.primary.dark,
                                    textDecoration: 'none',
                                    '&:hover': {
                                        textDecoration: 'none',
                                        color: theme.palette.primary.light,
                                    },
                                }}>
                                    {link.node.label}
                                </MuiLink>
                            </Button>
                            {checkMenuItem(link.node.id, data.menuItems.edges) && (
                                <Popover
                                    id={`menu-${link.node.id}`}
                                    anchorEl={anchorEl}
                                    open={Boolean(anchorEl && activeLink === link.node.id)}
                                    onClose={handleMenuClose}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    onMouseLeave={handleMouseLeave}
                                    sx={{
                                        '& .MuiPopover-paper': {
                                            backgroundColor: theme.palette.primary.contrastText,
                                        },
                                    }}
                                >
                                    {getMenuItems(link.node.id, data.menuItems.edges)}
                                </Popover>
                            )}
                        </li>
                    ))
            ) : (
                <div className="">no links</div>
            )}
        </ul>
    );
};

export async function getStaticProps() {
    // const { data } = await client.query({
    //     query: GET_MENU_MAIN
    // });

    const {data} = menuMain

    return {
        props: {
            initialData: data
        }
    };
}

export default MenuMain;




