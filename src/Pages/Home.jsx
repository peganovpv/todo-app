import React from 'react';

import { useAuth } from '../config/AuthContext'; 

import { Container, Typography, Button } from '@mui/material';

const Home = () => {

    const { isAuthenticated } = useAuth();

    return (
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
    );
};

export default Home;
