# Todo List Backend API

A RESTful API for managing todos built with Node.js, Express, and PostgreSQL.

## Features

- Create, Read, Update, Delete (CRUD) operations for todos
- Toggle todo completion status
- PostgreSQL database with connection pooling
- CORS enabled for frontend integration
- Environment-based configuration

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update the `.env` file with your PostgreSQL credentials:
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tododb
DB_USER=postgres
DB_PASSWORD=your_password
```

4. Create the database and initialize the schema:
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE tododb;

# Exit psql
\q

# Run the initialization script
psql -U postgres -d tododb -f init.sql
```

## Running the Application

### Development mode (with auto-reload):
```bash
npm run dev
```

### Production mode:
```bash
npm start
```

The server will start on `http://localhost:5000`

## API Endpoints

### Health Check
- **GET** `/health` - Check if API is running

### Todos
- **GET** `/api/todos` - Get all todos
- **GET** `/api/todos/:id` - Get a specific todo
- **POST** `/api/todos` - Create a new todo
  - Body: `{ "title": "string", "description": "string" }`
- **PUT** `/api/todos/:id` - Update a todo
  - Body: `{ "title": "string", "description": "string", "completed": boolean }`
- **PATCH** `/api/todos/:id/toggle` - Toggle todo completion status
- **DELETE** `/api/todos/:id` - Delete a todo

## Database Schema

```sql
CREATE TABLE todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Response Format

All API responses follow this format:

```json
{
  "success": true/false,
  "message": "Optional message",
  "data": {} or [],
  "count": number (for list endpoints)
}
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error