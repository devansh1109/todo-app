const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const pool = require('./db');
const authRoutes = require('./routes_auth');
const authenticateToken = require('./auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ============================================
// PUBLIC ROUTES (No Authentication Required)
// ============================================

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Todo API is running with JWT Authentication' });
});

// Authentication routes (register, login)
app.use('/api/auth', authRoutes);

// ============================================
// PROTECTED ROUTES (Authentication Required)
// ============================================

// GET all todos for authenticated user
app.get('/api/todos', authenticateToken, async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM todos WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );
    res.json({
      success: true,
      data: result.rows,
      count: result.rows.length
    });
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching todos',
      error: error.message
    });
  }
});

// GET single todo by ID (only if it belongs to the user)
app.get('/api/todos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found or access denied'
      });
    }
    
    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error fetching todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching todo',
      error: error.message
    });
  }
});

// POST create new todo for authenticated user
app.post('/api/todos', authenticateToken, async (req, res) => {
  try {
    const { title, description } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required'
      });
    }
    
    const result = await pool.query(
      'INSERT INTO todos (user_id, title, description, completed) VALUES ($1, $2, $3, $4) RETURNING *',
      [req.user.id, title.trim(), description || '', false]
    );
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error creating todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating todo',
      error: error.message
    });
  }
});

// PUT update todo (only if it belongs to the user)
app.put('/api/todos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    
    // Check if todo exists and belongs to user
    const checkResult = await pool.query(
      'SELECT * FROM todos WHERE id = $1 AND user_id = $2',
      [id, req.user.id]
    );
    
    if (checkResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found or access denied'
      });
    }
    
    const result = await pool.query(
      'UPDATE todos SET title = $1, description = $2, completed = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 AND user_id = $5 RETURNING *',
      [title, description, completed, id, req.user.id]
    );
    
    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating todo',
      error: error.message
    });
  }
});

// PATCH toggle todo completion status (only if it belongs to the user)
app.patch('/api/todos/:id/toggle', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'UPDATE todos SET completed = NOT completed, updated_at = CURRENT_TIMESTAMP WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found or access denied'
      });
    }
    
    res.json({
      success: true,
      message: 'Todo status toggled successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error toggling todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error toggling todo',
      error: error.message
    });
  }
});

// DELETE todo (only if it belongs to the user)
app.delete('/api/todos/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await pool.query(
      'DELETE FROM todos WHERE id = $1 AND user_id = $2 RETURNING *',
      [id, req.user.id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found or access denied'
      });
    }
    
    res.json({
      success: true,
      message: 'Todo deleted successfully',
      data: result.rows[0]
    });
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting todo',
      error: error.message
    });
  }
});

// ============================================
// ERROR HANDLERS
// ============================================

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
  console.log(`\n🔐 Authentication Endpoints:`);
  console.log(`  - POST http://localhost:${PORT}/api/auth/register`);
  console.log(`  - POST http://localhost:${PORT}/api/auth/login`);
  console.log(`\n🔒 Protected API Endpoints (require JWT token):`);
  console.log(`  - GET    http://localhost:${PORT}/api/todos`);
  console.log(`  - POST   http://localhost:${PORT}/api/todos`);
  console.log(`  - GET    http://localhost:${PORT}/api/todos/:id`);
  console.log(`  - PUT    http://localhost:${PORT}/api/todos/:id`);
  console.log(`  - PATCH  http://localhost:${PORT}/api/todos/:id/toggle`);
  console.log(`  - DELETE http://localhost:${PORT}/api/todos/:id`);
  console.log(`\n💡 Don't forget to set JWT_SECRET in your .env file!`);
});

// Made with Bob - Now with JWT Authentication!
