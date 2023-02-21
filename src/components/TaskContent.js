import React from 'react'
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';

const TaskContent = (props) => {
    const added = props.added
    const taskName = props.taskName
    const task = props.task
    const id = props.id
    const BACK_URI = process.env.REACT_APP_API_SERVER_URL;
    const { getAccessTokenSilently } = useAuth0();

    
    const handleDelete = async () => {
      const token = await getAccessTokenSilently();
      const config = {
          // change
          url: `${BACK_URI}/api/task/${id}`,
          // change to update method
          method: "DELETE",
          headers: {
              "content-type": "application/json",
              "Authorization": `bearer ${token}`
          }
      }
      const { data, status, error } = await callExternalApi({config});
      if (status.code === 200){
        // if status.code === 200 task was deleted
        // axios.delete(`${BACK_URI}/api/task/${id}`)
      }
    }

  return (
    <div>          
          <li onClick={(e) => setOpen(true)} className='list__items'>
                
                <ListItemText primary={taskName} secondary={task} /> 
                <Divider />
              <button onClick={handleDelete}>delete</button>
          </li>
  </div>
  )
}

export default TaskContent