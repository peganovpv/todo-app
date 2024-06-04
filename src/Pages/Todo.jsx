import React, { useState, useEffect } from 'react';

import { auth, db } from '../config/firebase';
import { get, ref, update } from 'firebase/database';

import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';

function Todo() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
        get(todosRef).then((snapshot) => {
            if (snapshot.exists()) {
                setTodos(Object.values(snapshot.val()));
            } else {
                setTodos([]);
            }
        });
    }, []);

    const handleAddTodo = async () => {
        setLoading(true);
        try {
            const newTodo = { id: todos.length + 1, text: todo, completed: false, createdAt: new Date().toISOString() };
            const newTodos = [...todos, newTodo];
            const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
            await update(todosRef, { ...newTodos });
            setTodos(newTodos);
            setTodo('');
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTodo = async (id) => {
        setLoading(true);
        try {
            const newTodos = todos.filter(todo => todo.id !== id);
            const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
            await update(todosRef, { ...newTodos });
            setTodos(newTodos);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleTodo = async (id) => {
        setLoading(true);
        try {
            const newTodos = todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo);
            const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
            await update(todosRef, { ...newTodos });
            setTodos(newTodos);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Typography variant="h4">Your Todos</Typography>
            <TextField
                label="Add new todo"
                variant="outlined"
                fullWidth
                value={todo}
                onChange={e => setTodo(e.target.value)}
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleAddTodo} disabled={!todo}>
                Add Todo
            </Button>
            {loading && <CircularProgress />}
            <List>
                {todos.map((item) => (
                    <ListItem key={item.id} secondaryAction={
                        <>
                            <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTodo(item.id)}>
                                <DeleteIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="complete" onClick={() => handleToggleTodo(item.id)}>
                                <CheckCircleOutlineIcon color={item.completed ? 'primary' : 'default'} />
                            </IconButton>
                        </>
                    }>
                        <ListItemText primary={item.text} style={{ textDecoration: item.completed ? 'line-through' : 'none' }} />
                    </ListItem>
                ))}
            </List>
            {error && <Snackbar open={true} autoHideDuration={6000} message={error} />}
        </Container>
    );
}

export default Todo;
