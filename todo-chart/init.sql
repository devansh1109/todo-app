-- Create database (run this separately if needed)
-- CREATE DATABASE tododb;

-- Connect to tododb and create table
CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    completed BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on completed status for faster queries
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);

-- Insert sample data
INSERT INTO todos (title, description, completed) VALUES
    ('Setup Development Environment', 'Install Node.js, PostgreSQL, and Docker', true),
    ('Create Backend API', 'Build REST API with Express and PostgreSQL', false),
    ('Build Frontend', 'Create React application with modern UI', false),
    ('Write Documentation', 'Add README with architecture and deployment instructions', false);

