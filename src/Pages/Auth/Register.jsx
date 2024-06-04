import React, { useState } from 'react'

import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set, ref } from 'firebase/database';

import { Container, Typography, TextField, Button } from '@mui/material';
import { Email, Lock, Person } from '@mui/icons-material';

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const register = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            await set(ref(db, `${user.uid}`), {
                name: name,
                email: email,
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
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
    );
}

export default Register;
