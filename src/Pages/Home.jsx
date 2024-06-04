import React from 'react';

import { auth } from '../config/firebase';

import { makeStyles } from '@mui/styles';
import { Container, Typography, Button } from '@mui/material';

import Todo from './Todo';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    title: {
        marginBottom: theme.spacing(4),
    },
}));

const checkIfUserIsAuthenticated = () => {
    if(auth.currentUser){
        return true;
    } else {
        return false;
    }
};

const Home = () => {
    const classes = useStyles();

    return (
        <Container className={classes.container}>
            <div>
                <Typography variant="h4" className={classes.title}>
                    Welcome to the TODO App!
                </Typography>
                {checkIfUserIsAuthenticated() ? (
                    <Todo />
                ) : (
                    <>
                    <Typography variant="body1">
                        You are not authenticated! Please login to access the TODO App.
                    </Typography>
                    <Button variant="contained" color="primary" href="/login">
                        Login
                    </Button>
                    </>
                )
                    }
            </div>
        </Container>
    );
};

export default Home;