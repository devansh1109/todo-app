import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';

const API_URL = 'http://localhost:5000/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      if (response.data.success) {
        setTodos(response.data.data);
        setError(null);
      }
    } catch (err) {
      setError('Failed to fetch todos. Make sure the backend server is running.');
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo
  const addTodo = async (title, description) => {
    try {
      const response = await axios.post(API_URL, { title, description });
      if (response.data.success) {
        setTodos([response.data.data, ...todos]);
        setError(null);
      }
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  // Update todo
  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
      if (response.data.success) {
        setTodos(todos.map(todo => 
          todo.id === id ? response.data.data : todo
        ));
        setError(null);
      }
    } catch (err) {
      setError('Failed to update todo');
      console.error('Error updating todo:', err);
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id) => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/toggle`);
      if (response.data.success) {
        setTodos(todos.map(todo => 
          todo.id === id ? response.data.data : todo
        ));
        setError(null);
      }
    } catch (err) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', err);
    }
  };

  // Delete todo
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      if (response.data.success) {
        setTodos(todos.filter(todo => todo.id !== id));
        setError(null);
      }
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <h1>📝 Todo List</h1>
          <p className="subtitle">Stay organized and productive</p>
          <div className="stats">
            <span className="stat">
              <strong>{completedCount}</strong> of <strong>{totalCount}</strong> completed
            </span>
          </div>
        </header>

        {error && (
          <div className="error-message">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)}>✕</button>
          </div>
        )}

        <TodoForm onAdd={addTodo} />

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading todos...</p>
          </div>
        ) : (
          <TodoList
            todos={todos}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        )}

        {!loading && todos.length === 0 && (
          <div className="empty-state">
            <p>🎉 No todos yet! Add one to get started.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

// Made with Bob
