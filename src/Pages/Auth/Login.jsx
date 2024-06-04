import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

import { auth,db } from '../../config/firebase';

import { makeStyles } from '@mui/styles';
import { Container, Typography, TextField, Button } from '@mui/material';

import LoadingScreen from '../../Components/LoadingScreen';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: theme.spacing(2),
    },
    title: {
        marginBottom: theme.spacing(4),
    },
}));

function Login() {

    const classes = useStyles();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        setLoading(true);
        try {
            await auth.signInWithEmailAndPassword(email, password);
            navigate('/');
        } catch (error) {
            console.error(error);
        }
        setLoading(false);
    }

    return (
        <Container className={classes.container}>
            {loading ? (
                <LoadingScreen />
            ) : (
                <div>
                    <Typography variant="h4" className={classes.title}>
                        Login
                    </Typography>
                    <form className={classes.form}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            variant="outlined"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={login}
                        >
                            Login
                        </Button>
                    </form>
                </div>
            )}
        </Container>
    );

}

export default Login;


