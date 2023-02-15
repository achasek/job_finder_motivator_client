import React from 'react'
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';


const TaskContent = (props) => {
    const added = props.added
    const taskName = props.taskName
    const task = props.task
    const id = props.id
    const BACK_URI = process.env.REACT_APP_API_SERVER_URL;

    
    const handleDelete = () => {
      axios.delete(`${BACK_URI}/api/user/delete/task/${id}`)
    }

  return (
    <div>          
          <li onClick={(e) => setOpen(true)} className='list-items'>
                
                <ListItemText primary={taskName} secondary={task} /> 
                <Divider />
              <button onClick={handleDelete}>delete</button>
          </li>
  </div>
  )
}

export default TaskContent