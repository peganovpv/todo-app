import React, { useState, useEffect } from 'react';

import { auth, db } from '../config/firebase';
import { get, ref, update } from 'firebase/database';

import { Container, Typography, TextField, Button } from '@mui/material';

function Todo() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const addTodo = async () => {
        setLoading(true)
        try{
            const newTodo = {
                id: todos.length + 1,
                text: todo,
                completed: false,
                createAt: new Date().toISOString()
            };
            const newTodos = [...todos, newTodo];
            const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
            await update(todosRef, newTodos);
            setTodos(newTodos);
            setTodo('');
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const deleteTodo = async (id) => {
        setLoading(true);
        try {
            const newTodos = todos.filter(todo => todo.id !== id);
            const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
            await update(todosRef, newTodos);
            setTodos(newTodos);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const toggleTodo = async (id) => {
        setLoading(true);
        try {
            const newTodos = todos.map(todo => {
                if(todo.id === id){
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo;
            });
            const todosRef = ref(db, `${auth.currentUser.uid}/todos`);
            await update(todosRef, newTodos);
            setTodos(newTodos);
        } catch (error) {
            setError(error.message);
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return(<></>)
}

export default Todo;