import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
    Container,
    Typography,
    TextField,
    Button,
    Card,
    CardContent,
    InputAdornment,
    Box,
    CircularProgress
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import Navbar from '../../Components/Navbar';
import LoadingScreen from '../../Components/LoadingScreen';

function Register() {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async (event) => {
        event.preventDefault(); // Prevent the form from refreshing the page
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            navigate('/'); // Navigate to homepage or dashboard after successful registration
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
                            Register
                        </Typography>
                        <form onSubmit={register}>
                            <TextField
                                label="Name"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                autoComplete="name"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PersonIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Email"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            <TextField
                                label="Password"
                                variant="outlined"
                                type="password"
                                fullWidth
                                margin="normal"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    ),
                                }}
                            />
                            {error && <Typography color="error">{error}</Typography>}
                            <Box mt={2}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    disabled={loading || !email || !password || !name}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Register'}
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Container>
        </>
    );
}

export default Register;
