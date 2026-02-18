import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Auth from './components/Auth';

const API_URL = '/api/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch todos when authenticated
  useEffect(() => {
    if (isAuthenticated && token) {
      fetchTodos();
    }
  }, [isAuthenticated, token]);

  // Create axios instance with auth header
  const getAxiosConfig = () => ({
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  // Handle login
  const handleLogin = (authToken, userData) => {
    setToken(authToken);
    setUser(userData);
    setIsAuthenticated(true);
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setTodos([]);
  };

  // Fetch all todos with JWT token
  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL, getAxiosConfig());
      if (response.data.success) {
        setTodos(response.data.data);
        setError(null);
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        // Token expired or invalid
        setError('Session expired. Please login again.');
        handleLogout();
      } else {
        setError('Failed to fetch todos. Make sure the backend server is running.');
      }
      console.error('Error fetching todos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new todo with JWT token
  const addTodo = async (title, description) => {
    try {
      const response = await axios.post(
        API_URL, 
        { title, description },
        getAxiosConfig()
      );
      if (response.data.success) {
        setTodos([response.data.data, ...todos]);
        setError(null);
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired. Please login again.');
        handleLogout();
      } else {
        setError('Failed to add todo');
      }
      console.error('Error adding todo:', err);
    }
  };

  // Update todo with JWT token
  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`, 
        updatedTodo,
        getAxiosConfig()
      );
      if (response.data.success) {
        setTodos(todos.map(todo => 
          todo.id === id ? response.data.data : todo
        ));
        setError(null);
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired. Please login again.');
        handleLogout();
      } else {
        setError('Failed to update todo');
      }
      console.error('Error updating todo:', err);
    }
  };

  // Toggle todo completion with JWT token
  const toggleTodo = async (id) => {
    try {
      const response = await axios.patch(
        `${API_URL}/${id}/toggle`,
        {},
        getAxiosConfig()
      );
      if (response.data.success) {
        setTodos(todos.map(todo => 
          todo.id === id ? response.data.data : todo
        ));
        setError(null);
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired. Please login again.');
        handleLogout();
      } else {
        setError('Failed to toggle todo');
      }
      console.error('Error toggling todo:', err);
    }
  };

  // Delete todo with JWT token
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(
        `${API_URL}/${id}`,
        getAxiosConfig()
      );
      if (response.data.success) {
        setTodos(todos.filter(todo => todo.id !== id));
        setError(null);
      }
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        setError('Session expired. Please login again.');
        handleLogout();
      } else {
        setError('Failed to delete todo');
      }
      console.error('Error deleting todo:', err);
    }
  };

  // Show login/register screen if not authenticated
  if (!isAuthenticated) {
    return <Auth onLogin={handleLogin} />;
  }

  const completedCount = todos.filter(todo => todo.completed).length;
  const totalCount = todos.length;

  return (
    <div className="App">
      <div className="container">
        <header className="app-header">
          <div className="header-content">
            <div>
              <h1>📝 Todo List</h1>
              <p className="subtitle">Stay organized and productive</p>
            </div>
            <div className="user-info">
              <span className="user-name">👤 {user?.name || user?.email}</span>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
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

