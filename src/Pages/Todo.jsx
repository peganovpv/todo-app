import React, { useState, useEffect } from 'react';

import { auth, db } from '../config/firebase';
import { get, ref, update } from 'firebase/database';

import { v4 as uuidv4 } from 'uuid';

import { Container, Typography, TextField, Button, List, ListItem, ListItemText, IconButton, Card, CardContent, Box, CircularProgress, Snackbar, ToggleButton, ToggleButtonGroup } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import Navbar from '../Components/Navbar';

function Todo() {
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true); // Track initial loading
    const [error, setError] = useState(null);
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');
    const [filter, setFilter] = useState('all'); // Filter state

    useEffect(() => {
        setLoading(true);
        const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
        get(todosRef).then((snapshot) => {
            if (snapshot.exists()) {
                setTodos(Object.values(snapshot.val()));
            } else {
                setTodos([]);
            }
            setLoading(false);
            setInitialLoad(false);
        }).catch(error => {
            setError(error.message);
            setLoading(false);
        });
    }, []);

    const handleAddTodo = async () => {
        if (!todo.trim()) return; // Prevent adding empty todos
        setLoading(true);
        try {
            const newTodo = { id: uuidv4(), text: todo.trim(), completed: false, createdAt: new Date().toISOString() };
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

    const handleClearCompleted = async () => {
        setLoading(true);
        try {
            const activeTodos = todos.filter(todo => !todo.completed);
    
            const updates = {};
            todos.forEach(todo => {
                if (todo.completed) {
                    updates[`${auth.currentUser.uid}/todos/${todo.id}`] = null;
                }
            });
    
            const todosRef = ref(db);
            await update(todosRef, updates);

            setTodos(activeTodos);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    

    const handleFilterChange = (event, newFilter) => {
        if (newFilter) {
            setFilter(newFilter);
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'completed') return todo.completed;
        if (filter === 'active') return !todo.completed;
        return true;
    });

    return (
        <>
            <Navbar />
            <Container sx={{ my: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Card sx={{ mb: 2, width: '100%', maxWidth: 600, boxShadow: 3 }}>
                    <CardContent>
                        <Typography variant="h4" gutterBottom>
                            Add New Todo
                        </Typography>
                        <TextField
                            label="Add new todo"
                            variant="outlined"
                            fullWidth
                            value={todo}
                            onChange={e => setTodo(e.target.value)}
                            margin="normal"
                        />
                        <Button variant="contained" color="primary" onClick={handleAddTodo} disabled={!todo.trim()}>
                            Add Todo
                        </Button>
                    </CardContent>
                </Card>
                {loading && initialLoad && <CircularProgress />}
                <ToggleButtonGroup
                    color="primary"
                    value={filter}
                    exclusive
                    onChange={handleFilterChange}
                    sx={{ mb: 2 }}
                >
                    <ToggleButton value="all">All</ToggleButton>
                    <ToggleButton value="active">Active</ToggleButton>
                    <ToggleButton value="completed">Completed</ToggleButton>
                </ToggleButtonGroup>
                <Button onClick={handleClearCompleted} color="secondary" variant="outlined">
                    Clear Completed
                </Button>
                {!loading || !initialLoad ? (
                    <Card sx={{ width: '100%', maxWidth: 600, boxShadow: 3 }}>
                        <CardContent>
                            <Typography variant="h4" gutterBottom>
                                Your Todos
                            </Typography>
                            {todos.length === 0 && <Typography variant="body2">No todos found!</Typography>}
                            <List>
                                {filteredTodos.map((item) => (
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
                        </CardContent>
                    </Card>
                ) : <CircularProgress />}
                {error && <Snackbar open={true} autoHideDuration={6000} message={error} />}
            </Container>
        </>
    );
}

export default Todo;
