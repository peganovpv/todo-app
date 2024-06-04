import React, { useState } from 'react'

import { auth, db } from '../../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { set, ref } from 'firebase/database';

import { makeStyles } from '@mui/styles';
import { Container, Typography, TextField, Button } from '@mui/material';
import { EmailIcon, LockIcon, PersonIcon } from '@mui/icons-material';

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

function Register() {

    const classes = useStyles();

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
        <Container className={classes.container}>
            <div>
                <Typography variant="h4" className={classes.title}>
                    Register
                </Typography>
                <form className={classes.form}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        InputProps={{
                            startAdornment: <PersonIcon />,
                        }}
                    />
                    <TextField
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        InputProps={{
                            startAdornment: <EmailIcon />,
                        }}
                    />
                    <TextField
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        InputProps={{
                            startAdornment: <LockIcon />,
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
