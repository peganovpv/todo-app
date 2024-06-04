import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

import { auth } from '../../config/firebase';

import { Container, Typography, TextField, Button } from '@mui/material';

import LoadingScreen from '../../Components/LoadingScreen';

function Login() {

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
        <Container >
            {loading ? (
                <LoadingScreen />
            ) : (
                <div>
                    <Typography variant="h4" >
                        Login
                    </Typography>
                    <form>
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
