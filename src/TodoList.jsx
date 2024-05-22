import React from 'react'
import Todo from './Todo'

const TodoList = ({ todos, toggleTodo, deleteTask}) => {
  return (
    todos.map((todo) => <Todo todo={todo} key={todo.id} toggleTodo={toggleTodo} deleteTask={deleteTask}/>));
}

export default TodoList
