import React from 'react'
import Todo from './Todo'
import './TodoList.css'

const TodoList = ({ todos, toggleTodo, deleteTask}) => {
  return (
    <div id="topLink">
      {todos.map((todo) => (
        <Todo  todo={todo} key={todo.id} toggleTodo={toggleTodo} deleteTask={deleteTask} />
      ))}
      <p id="top"><a href="#topLink">⇧ Top</a></p>
    </div>
  );
}

export default TodoList
