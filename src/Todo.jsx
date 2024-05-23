import './Todo.css';

import React from 'react';

const Todo = ({ todo, toggleTodo, deleteTask }) => {
  const handleTodoClick = () => {
    toggleTodo(todo.id);
  };

  return (
    <div>
      <label className="task">
        <input type="checkbox" className="filled-in" checked={todo.completed} readOnly onChange={handleTodoClick} />
        <span className="taskName">{todo.name}</span>
        <button className=" btn-small  red lighten-1 delete-button" onClick={() => deleteTask(todo.id)}>×</button>
      </label>
    </div>
  );
};

export default Todo;
