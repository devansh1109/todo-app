# Todo List Frontend

A modern, responsive React application for managing todos with a beautiful UI.

## Features

- Create, read, update, and delete todos
- Toggle todo completion status
- Add optional descriptions to todos
- Separate views for active and completed todos
- Real-time statistics
- Responsive design for mobile and desktop
- Beautiful gradient UI with smooth animations

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running on port 5000

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

### Development mode:
```bash
npm start
```

The application will start on `http://localhost:3000`

### Build for production:
```bash
npm build
```

This creates an optimized production build in the `build` folder.

## Project Structure

```
frontend/
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── TodoForm.js     # Form for adding new todos
│   │   ├── TodoForm.css
│   │   ├── TodoList.js     # List container component
│   │   ├── TodoList.css
│   │   ├── TodoItem.js     # Individual todo item
│   │   └── TodoItem.css
│   ├── App.js              # Main application component
│   ├── App.css
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles
├── package.json
└── README.md
```

## API Integration

The frontend communicates with the backend API at `http://localhost:5000/api/todos`

### API Endpoints Used:
- `GET /api/todos` - Fetch all todos
- `POST /api/todos` - Create a new todo
- `PUT /api/todos/:id` - Update a todo
- `PATCH /api/todos/:id/toggle` - Toggle completion status
- `DELETE /api/todos/:id` - Delete a todo

## Configuration

The API URL is configured in [`App.js`](src/App.js:8):
```javascript
const API_URL = 'http://localhost:5000/api/todos';
```

You can also use the proxy configuration in [`package.json`](package.json:37) for development:
```json
"proxy": "http://localhost:5000"
```

## Technologies Used

- React 18
- Axios for HTTP requests
- CSS3 with animations and gradients
- React Hooks (useState, useEffect)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)