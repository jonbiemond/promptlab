import { AppBar, Box, CssBaseline, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar, Typography, makeStyles, useMediaQuery, useTheme } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import LightModeIcon from '@mui/icons-material/LightMode';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import LaunchIcon from '@mui/icons-material/Launch';
import React, { useState } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import AddIcon from '@mui/icons-material/Add';

const DRAWER_WIDTH = 240;

export default function ResponsiveSidebar(props: any) {
    const { children } = props;
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const matchSm = useMediaQuery(theme.breakpoints.up('sm'));

    const sidebarFooters = [
        {
            title: "Light mode",
            icon: <LightModeIcon />,
        },
        {
            title: "Your Goals",
            icon: <TrackChangesIcon />
        },
        {
            title: "Updates & FAQ",
            icon: <LaunchIcon />,
        },
        {
            title: "Log out",
            icon: <LogoutIcon />,
        }
    ];

    const conversations = ['Goal 1', 'Goal 2', 'Goal 3']

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box display="flex" flexDirection="column" height="100%" justifyContent="space-between">
            <Box>
                <List>
                    <ListItem disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                <AddIcon />
                            </ListItemIcon>
                            <ListItemText primary="New Chat" />
                        </ListItemButton>
                    </ListItem>
                    {conversations.map((text, index) => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
            <Box>
                <Divider />
                <List>
                    {sidebarFooters.map((item, index) => (
                        <ListItem key={item.title} disablePadding>
                            <ListItemButton>
                                {item.icon}
                                <ListItemText primary={item.title} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                sx={{
                    width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
                    ml: { sm: `${DRAWER_WIDTH}px` },
                }}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        PromptLabs
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box
                sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
            >
                {matchSm ?
                    <Drawer
                        variant="permanent"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                        }}
                        open
                    >
                        {drawer}
                    </Drawer> :
                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', sm: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH },
                        }}
                    >
                        {drawer}
                    </Drawer>
                }
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` } }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
}
