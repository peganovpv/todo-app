import React from 'react';

import { auth } from '../config/firebase';

import { Container, Typography, Button } from '@mui/material';

const checkIfUserIsAuthenticated = () => {
    if(auth.currentUser){
        return true;
    } else {
        return false;
    }
};

const Home = () => {

    return (
        <Container >
            <div>
                <Typography variant="h4" >
                    Welcome to the TODO App!
                </Typography>
                {checkIfUserIsAuthenticated() ? (
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
                )
                    }
            </div>
        </Container>
    );
};

export default Home;