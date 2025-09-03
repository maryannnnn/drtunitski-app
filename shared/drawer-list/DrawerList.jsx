import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuMobileBottom from "../menu-mobile-bottom/MenuMobileBottom";
import MenuMainMobile from "../menu-main-mobile/MenuMainMobile";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';


const DrawerList = ({ toggleDrawer }) => {
    return (
        <Box
            sx={{
                width: 250,
                display: 'flex',
                flexDirection: 'column',
                position: 'relative', // Для стилизации крестика
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            {/* Верхняя часть с крестиком */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                    padding: '8px',
                }}
                onClick={(e) => e.stopPropagation()} // Предотвращает закрытие при клике на крестик
            >
                <IconButton
                    edge="end"
                    aria-label="close"
                    onClick={toggleDrawer(false)}
                >
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Основной контент */}
            <List>
                <MenuMainMobile />
            </List>
            <Divider />
            <List>
                <MenuMobileBottom />
            </List>
        </Box>
    );
};

export default DrawerList;