import './AddTask.css';
import React from 'react'


const AddTask = ({ handleSubmit, todoNameref }) => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <label className="addTask">
            <input type="text" name="name" placeholder="TaskName" required ref={todoNameref} />
            <button type="submit">Add</button>
          </label>
        </form>
    </div>
  )
}

export default AddTask