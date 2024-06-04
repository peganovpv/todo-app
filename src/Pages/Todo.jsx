import React, { useState, useEffect } from 'react';

import { auth, db } from '../config/firebase';
import { get, ref, update } from 'firebase/database';

import { Container, Typography, TextField, Button } from '@mui/material';

function Todo() {

    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {
        const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
        get(todosRef).then((snapshot) => {
            if (snapshot.exists()) {
                setTodos(snapshot.val());
            } else {
                setTodos([]);
            }
        });
    }, []);

    const addTodo = () => {
        const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
        const newTodo = {
            id: todos.length,
            text: todo,
            completed: false,
        };
        update(todosRef, [...todos, newTodo]);
        setTodo('');
    }

    const toggleTodo = (id) => {
        const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
        const updatedTodos = todos.map((todo) => {
            if (todo.id === id) {
                return {
                    ...todo,
                    completed: !todo.completed,
                };
            }
            return todo;
        });
        update(todosRef, updatedTodos);
    }

    const deleteTodo = (id) => {
        const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
        const updatedTodos = todos.filter((todo) => todo.id !== id);
        update(todosRef, updatedTodos);
    }

    return (
        <Container>
            <div>
                <Typography variant="h4">
                    My Todos
                </Typography>
                <form >
                    <TextField
                        label="Add a new todo"
                        variant="outlined"
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={addTodo}
                    >
                        Add Todo
                    </Button>
                </form>
                <ul>
                    {todos.map((todo) => (
                        <li key={todo.id}>
                            <Typography
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                }}
                            >
                                {todo.text}
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => toggleTodo(todo.id)}
                            >
                                Toggle
                            </Button>
                            <Button
                                variant="contained"
                                color="secondary"
                                onClick={() => deleteTodo(todo.id)}
                            >
                                Delete
                            </Button>
                        </li>
                    ))}
                </ul>
            </div>
        </Container>
    );

}

export default Todo;