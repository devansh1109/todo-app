import React from 'react';
import TodoItem from './TodoItem';
import './TodoList.css';

function TodoList({ todos, onToggle, onUpdate, onDelete }) {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  return (
    <div className="todo-list">
      {activeTodos.length > 0 && (
        <div className="todo-section">
          <h2 className="section-title">
            📋 Active Tasks ({activeTodos.length})
          </h2>
          <div className="todos">
            {activeTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}

      {completedTodos.length > 0 && (
        <div className="todo-section">
          <h2 className="section-title">
            ✅ Completed ({completedTodos.length})
          </h2>
          <div className="todos">
            {completedTodos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default TodoList;

