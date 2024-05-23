import './AddTask.css'
import React from 'react'

const AddTask = ({ handleSubmit, todoNameref }) => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
          <label className="addTask">
            <input type="text" name="name" title="" placeholder="TaskName" required ref={todoNameref} />
            <button type="submit" className="btn btn-primary">Add</button>
          </label>
        </form>
    </div>
  )
}

export default AddTask