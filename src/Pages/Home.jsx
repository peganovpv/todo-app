import React, { useEffect, useState } from 'react';

import { Container, Typography, Button } from '@mui/material';

import Navbar from '../Components/Navbar';
import { auth } from '../config/firebase';

const Home = () => {

    const user = auth.currentUser;

    const [isAuthenticated, setIsAuthenticated] = useState();

    useEffect(() => {
        setIsAuthenticated(user !== null);
    }, [user]);

    return (
        <>
        <Navbar />
        <Container>
            <Typography variant="h4">
                Welcome to the TODO App!
            </Typography>
            {isAuthenticated ? (
                <Button variant="contained" color="primary" href="/todo">
                    Go to TODO App
                </Button>
            ) : (
                <>
                    <Typography variant="body1">
                        You are not authenticated! Please login to access the TODO App.
                    </Typography>
                    <Button variant="contained" color="primary" href="/login">
                        Login
                    </Button>
                    <Button variant="contained" color="primary" href="/register">
                        Register
                    </Button>
                </>
            )}
        </Container>
        </>
    );
};

export default Home;
