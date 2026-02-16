import React, { useState } from 'react';
import './TodoForm.css';

function TodoForm({ onAdd }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDescription, setShowDescription] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onAdd(title.trim(), description.trim());
      setTitle('');
      setDescription('');
      setShowDescription(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="todo-input"
          placeholder="What needs to be done?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
        />
      </div>

      {showDescription && (
        <div className="form-group">
          <textarea
            className="todo-textarea"
            placeholder="Add a description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="3"
          />
        </div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="btn-secondary"
          onClick={() => setShowDescription(!showDescription)}
        >
          {showDescription ? '➖ Hide Details' : '➕ Add Details'}
        </button>
        <button type="submit" className="btn-primary" disabled={!title.trim()}>
          ✓ Add Todo
        </button>
      </div>
    </form>
  );
}

export default TodoForm;

