import React, { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { auth } from '../../config/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { Container, Typography, TextField, Button, Card, CardContent, Box, CircularProgress } from '@mui/material';

import Navbar from '../../Components/Navbar';
import LoadingScreen from '../../Components/LoadingScreen';

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const login = async () => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <>
            <Navbar />
            <Container component="main" maxWidth="xs" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh', justifyContent: 'center' }}>
                <Card sx={{ width: '100%', boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" component="h1" gutterBottom>
                            Login
                        </Typography>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            login();
                        }}>
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                            />
                            {error && <Typography color="error">{error}</Typography>}
                            <Box mt={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Login'}
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

export default Login;
