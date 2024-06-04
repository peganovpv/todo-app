import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Todo from './Todo';  // Adjust the import path as necessary
import { BrowserRouter } from 'react-router-dom';
import * as firebaseDatabase from 'firebase/database';

// Mock the Firebase database module
jest.mock('firebase/database', () => ({
    get: jest.fn(),
    ref: jest.fn(),
    update: jest.fn(),
    onValue: jest.fn(),
}));

// Mock auth and db imports
jest.mock('../config/firebase', () => ({
    auth: {
        currentUser: {
            uid: 'testUID'
        }
    },
    db: {}
}));

const setupFirebaseMocks = (mockData) => {
    firebaseDatabase.get.mockImplementation(() => Promise.resolve({
        exists: () => true,
        val: () => mockData
    }));

    firebaseDatabase.update.mockImplementation(() => Promise.resolve());
    firebaseDatabase.ref.mockImplementation(() => ({}));
};

describe('Todo Component', () => {
    beforeEach(() => {
        setupFirebaseMocks({
            '1': { id: '1', text: 'Test Todo 1', completed: false },
            '2': { id: '2', text: 'Test Todo 2', completed: true }
        });
        render(
            <BrowserRouter>
                <Todo />
            </BrowserRouter>
        );
    });

    test('renders the Todo component with initial data', async () => {
        await waitFor(() => {
            expect(screen.getByText(/Test Todo 1/i)).toBeInTheDocument();
            expect(screen.getByText(/Test Todo 2/i)).toBeInTheDocument();
        });
    });

    test('allows a user to add a todo', async () => {
        const input = screen.getByLabelText(/Add new todo/i);
        const button = screen.getByText(/Add Todo/i);
        fireEvent.change(input, { target: { value: 'New Todo' } });
        fireEvent.click(button);
        await waitFor(() => {
            expect(firebaseDatabase.update).toHaveBeenCalled();
        });
    });

    test('filters to show only completed todos', async () => {
        const filterCompleted = screen.getByText(/Completed/i);
        fireEvent.click(filterCompleted);
        await waitFor(() => {
            expect(screen.queryByText('Test Todo 1')).not.toBeInTheDocument();
            expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
        });
    });

    test('clears completed todos', async () => {
        const clearCompleted = screen.getByText(/Clear Completed/i);
        fireEvent.click(clearCompleted);
        await waitFor(() => {
            expect(firebaseDatabase.update).toHaveBeenCalled();
        });
    });
});
