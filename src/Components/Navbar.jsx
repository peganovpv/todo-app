import React, { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import { auth } from '../config/firebase';
import { signOut } from 'firebase/auth';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

const Navbar = () => {

    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(() => {
        setIsAuthenticated(auth.currentUser !== null);
    }, [auth.currentUser]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <List>
                <ListItem component={RouterLink} to="/">
                    <ListItemText primary="Home" />
                </ListItem>
                {isAuthenticated ? (
                    <ListItem onClick={() => signOut(auth)}>
                        <ListItemText primary="signOut" />
                    </ListItem>
                ) : (
                    <>
                        <ListItem component={RouterLink} to="/login">
                            <ListItemText primary="Login" />
                        </ListItem>
                        <ListItem component={RouterLink} to="/register">
                            <ListItemText primary="Register" />
                        </ListItem>
                    </>
                )}
                <ListItem component={RouterLink} to="/todo">
                    <ListItemText primary="Todo" />
                </ListItem>
            </List>
        </div>
    );

    return (
        <AppBar position="static">
            <Toolbar>
                {isMobile && (
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                )}
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    TODO App
                </Typography>
                {!isMobile && (
                    <div>
                        <Button color="inherit" component={RouterLink} to="/">
                            Home
                        </Button>
                        {isAuthenticated ? (
                            <Button color="inherit" onClick={() => signOut}>
                                Logout
                            </Button>
                        ) : (
                            <>
                                <Button color="inherit" component={RouterLink} to="/login">
                                    Login
                                </Button>
                                <Button color="inherit" component={RouterLink} to="/register">
                                    Register
                                </Button>
                            </>
                        )}
                        <Button color="inherit" component={RouterLink} to="/todo">
                            Todo
                        </Button>
                    </div>
                )}
            </Toolbar>
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                }}
            >
                {drawer}
            </Drawer>
        </AppBar>
    );
};

export default Navbar;
