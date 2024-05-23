import React from 'react'
import Todo from './Todo'
import './TodoList.css'

const TodoList = ({ todos, toggleTodo, deleteTask}) => {
  return (
    <div id="listTop">
      {todos.map((todo) => (
        <Todo  todo={todo} key={todo.id} toggleTodo={toggleTodo} deleteTask={deleteTask} />
      ))}
      <p id="top"><a href="#listTop">⇧ Top</a></p>
    </div>
  );
}

export default TodoList
