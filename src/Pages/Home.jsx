import React, { useEffect, useState } from 'react';

import { auth } from '../config/firebase';

import { Container, Typography, Button, Box, Paper } from '@mui/material';

import Navbar from '../Components/Navbar';

const Home = () => {
    const user = auth.currentUser;
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setIsAuthenticated(user !== null);
    }, [user]);

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="sm">
                <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '100vh', 
                    textAlign: 'center' 
                }}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h4" gutterBottom>
                            Welcome to the TODO App!
                        </Typography>
                        <Typography variant="subtitle1" sx={{ mb: 2 }}>
                            Manage your tasks efficiently and effectively, all in one place.
                        </Typography>
                        {isAuthenticated ? (
                            <Button variant="contained" color="primary" href="/todo" size="large">
                                Go to TODO App
                            </Button>
                        ) : (
                            <>
                                <Typography variant="body1" gutterBottom>
                                    You are not authenticated! Please login or register to access the TODO App.
                                </Typography>
                                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
                                    <Button variant="contained" color="primary" href="/login" size="large">
                                        Login
                                    </Button>
                                    <Button variant="contained" color="primary" href="/register" size="large">
                                        Register
                                    </Button>
                                </Box>
                            </>
                        )}
                    </Paper>
                </Box>
            </Container>
        </>
    );
};

export default Home;
