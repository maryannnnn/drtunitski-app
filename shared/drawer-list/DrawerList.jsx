import * as React from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import MenuMainMobile from "../menu-main-mobile/MenuMainMobile";
import IconButton from "@mui/material/IconButton";
import CloseIcon from '@mui/icons-material/Close';
import { useI18n } from "../hooks/useI18n";


const DrawerList = ({ toggleDrawer }) => {
    const { isRTL, textAlign } = useI18n();
    
    return (
        <Box
            sx={{
                width: 320, // Увеличиваем ширину с 250 до 320px
                display: 'flex',
                flexDirection: 'column',
                position: 'relative', // Для стилизации крестика
                direction: isRTL ? 'rtl' : 'ltr', // Направление текста
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
        >
            {/* Верхняя часть с крестиком */}
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: isRTL ? 'flex-start' : 'flex-end', // RTL: слева, LTR: справа
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
        </Box>
    );
};

export default DrawerList;