import React, { useState } from 'react'

import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set, ref } from 'firebase/database';

import { Grid, Container, Typography, TextField, Button, Modal } from '@mui/material';
import { Email, Lock, Person } from '@mui/icons-material';

import LoadingScreen from '../../Components/LoadingScreen';

function Register() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [open, setOpen] = useState(false);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await set(ref(db, `${user.uid}`), {
                name: name,
                email: email,
            });
        } catch (error) {
            console.error(error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    if(loading){
        return <LoadingScreen />
    }

    return (
        <>
        <Modal 
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >   
            {!error && 
            <Grid container>
                <Typography variant="h4">
                    Account created successfully!
                </Typography>
                <Button variant="contained" color="primary" href="/login">
                    Login
                </Button>
            </Grid>}
            {error && 
            <Grid container>
                <Typography variant="h4" color="error">
                    Error!
                </Typography>
                <Typography variant="body1" color="error">
                    {error}
                </Typography>
                <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
                    Close
                </Button>
            </Grid>
            }
        </Modal>
        <Container>
            <div>
                <Typography variant="h4">
                    Register
                </Typography>
                <form>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        InputProps={{
                            startAdornment: <Person />,
                        }}
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: <Email />,
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: <Lock />,
                        }}
                    />
                    <Button variant="contained" color="primary" onClick={register}>
                        Register
                    </Button>
                </form>
            </div>
        </Container>
        </>
    );
}

export default Register;
