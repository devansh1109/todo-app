# Todo List Application

A full-stack Todo List application built with Node.js, React, and PostgreSQL. This project demonstrates microservices architecture with containerization support for Docker and Kubernetes deployment.

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Todo List Application                    │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐      ┌───────────┐ │
│  │   Frontend   │◄────►│   Backend    │◄────►│ PostgreSQL│ │
│  │   (React)    │      │  (Node.js)   │      │ Database  │ │
│  │  Port: 3000  │      │  Port: 5000  │      │ Port: 5432│ │
│  └──────────────┘      └──────────────┘      └───────────┘ │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Components

1. **Frontend (React)**
   - Modern, responsive UI with gradient design
   - Real-time todo management
   - CRUD operations with inline editing
   - Separate views for active and completed todos

2. **Backend (Node.js + Express)**
   - RESTful API with full CRUD operations
   - PostgreSQL database integration
   - CORS enabled for frontend communication
   - Environment-based configuration

3. **Database (PostgreSQL)**
   - Relational database for persistent storage
   - Indexed queries for performance
   - Timestamps for tracking creation and updates

## 📋 Features

- ✅ Create, read, update, and delete todos
- ✅ Toggle todo completion status
- ✅ Add optional descriptions to todos
- ✅ Real-time statistics (completed vs total)
- ✅ Responsive design for all devices
- ✅ RESTful API architecture
- ✅ PostgreSQL database with connection pooling
- ✅ Error handling and validation
- ✅ Ready for containerization (Docker/Kubernetes)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
cd todo-app
```

2. **Set up the database**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE tododb;

# Exit psql
\q

# Run the initialization script
psql -U postgres -d tododb -f backend/init.sql
```

3. **Set up the backend**
```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Update .env with your PostgreSQL credentials
# Edit the .env file with your database credentials

# Start the backend server
npm start
```

The backend will run on `http://localhost:5000`

4. **Set up the frontend**
```bash
cd ../frontend

# Install dependencies
npm install

# Start the frontend application
npm start
```

The frontend will run on `http://localhost:3000`

## 📁 Project Structure

```
todo-app/
├── backend/
│   ├── server.js           # Express server and API routes
│   ├── db.js               # PostgreSQL connection configuration
│   ├── init.sql            # Database schema and sample data
│   ├── package.json        # Backend dependencies
│   ├── .env.example        # Environment variables template
│   ├── .gitignore
│   └── README.md           # Backend documentation
├── frontend/
│   ├── public/
│   │   └── index.html      # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── TodoForm.js     # Form component
│   │   │   ├── TodoList.js     # List component
│   │   │   └── TodoItem.js     # Item component
│   │   ├── App.js          # Main application
│   │   ├── index.js        # Entry point
│   │   └── *.css           # Styling files
│   ├── package.json        # Frontend dependencies
│   ├── .gitignore
│   └── README.md           # Frontend documentation
└── README.md               # This file
```

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/todos` | Get all todos |
| GET | `/todos/:id` | Get a specific todo |
| POST | `/todos` | Create a new todo |
| PUT | `/todos/:id` | Update a todo |
| PATCH | `/todos/:id/toggle` | Toggle completion status |
| DELETE | `/todos/:id` | Delete a todo |

### Example Request

**Create a new todo:**
```bash
curl -X POST http://localhost:5000/api/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn Kubernetes", "description": "Deploy app to K8s cluster"}'
```

**Response:**
```json
{
  "success": true,
  "message": "Todo created successfully",
  "data": {
    "id": 1,
    "title": "Learn Kubernetes",
    "description": "Deploy app to K8s cluster",
    "completed": false,
    "created_at": "2024-02-05T07:30:00.000Z",
    "updated_at": "2024-02-05T07:30:00.000Z"
  }
}
```

## 🗄️ Database Schema

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

## 🐳 Docker & Kubernetes Deployment

### Docker

**Coming Soon:** Dockerfiles and docker-compose.yml for containerization

### Kubernetes

**Coming Soon:** Kubernetes manifests including:
- Deployment configurations
- Service definitions
- ConfigMaps for configuration
- Secrets for sensitive data
- Persistent Volume Claims for database

### Helm Charts

**Coming Soon:** Helm charts for simplified Kubernetes deployment

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development
```bash
cd frontend
npm start  # Runs with hot-reload
```

### Testing the API
```bash
# Health check
curl http://localhost:5000/health

# Get all todos
curl http://localhost:5000/api/todos
```

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=tododb
DB_USER=postgres
DB_PASSWORD=your_password
```

## 🔒 Security Considerations

- Environment variables for sensitive data
- Input validation on API endpoints
- CORS configuration for frontend access
- SQL injection prevention using parameterized queries
- Error handling without exposing sensitive information

## 🚧 Future Enhancements

- [ ] User authentication and authorization
- [ ] Todo categories and tags
- [ ] Due dates and reminders
- [ ] Search and filter functionality
- [ ] Dark mode support
- [ ] Export/Import todos
- [ ] Docker containerization
- [ ] Kubernetes deployment manifests
- [ ] Helm charts
- [ ] CI/CD pipeline
- [ ] Unit and integration tests

## 📄 License

This project is open source and available under the MIT License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

For issues and questions, please open an issue in the repository.

---

**Built with ❤️ using Node.js, React, and PostgreSQL**