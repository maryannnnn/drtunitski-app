import * as React from 'react';
import "./media.scss"
import Drawer from '@mui/material/Drawer';
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerList from "../drawer-list/DrawerList";
import { useI18n } from "../hooks/useI18n";

const DrawerMenu = () => {
    const [open, setOpen] = React.useState(false);
    const { isRTL, direction } = useI18n();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    return (
        <div className="icon-button-hide">
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer(true)}
                edge="start"
                sx={{
                    marginRight: 2,
                    padding: '12px', // Увеличение кликабельной области
                    ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon sx={{ fontSize: 40 }} />
            </IconButton>

            <Drawer 
                open={open} 
                onClose={toggleDrawer(false)}
                anchor={isRTL ? 'right' : 'left'} // RTL: справа, LTR: слева
                PaperProps={{
                    sx: {
                        backgroundColor: '#FFF9F0', // Используем цвет $white из _colors.scss
                        direction: direction, // Устанавливаем направление текста
                    }
                }}
            >
                <DrawerList toggleDrawer={toggleDrawer}/>
            </Drawer>
        </div>
    )
        ;
}

export default DrawerMenu
