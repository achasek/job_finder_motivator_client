import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';

function TodoListForm(props) {
  const [task, setTask] = useState({})
  const [importance, setImportance] = useState({})
  const [taskName, setTaskName] = useState({})
  const email = props.email
  const BACK_URI = process.env.REACT_APP_API_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();
  const handleTaskName = (e) => {
    const tn = e.target.value
    setTaskName(tn)
    console.log(task)
  }

  const handleTask = (e) => {
    const t = e.target.value
    setTask(t)
    console.log(task)
  }

  const handleImportance = (e) => {
    const i = e.target.value
    setImportance(i)
    console.log(importance)
  }

  const postUserTasks = async () => {
    const body = {task: taskName, description: task, importance}
    console.log(body)

    const token = await getAccessTokenSilently();
    const config = {
        // change
        url: `${BACK_URI}/api/task/`,
        // change to update method
        method: "POST",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${token}`
        },
        data: body
    }
    const { data, status, error } = await callExternalApi({config});
    console.log({status});
    if (data){
      console.log({task: data.task});
    } else {
      console.error(error);
    }
  }
  
  
  return(
    <div className='todo__form'>
      <div className='form__title'>
        <h1>Add an item to your todo list!</h1>
      </div>
      <div className='form'>
         <input className='todo__input' onChange={(e) => handleTaskName(e)} type='text' id='todo-input' placeholder='New task'></input>
          <input className='todo__input' onChange={(e) => handleTask(e)} type='text' id='todo-input' placeholder='New task desciption'></input>
          <br/>
          <label className='todo__select-label'>Level Of Importance</label>
            <select className='todo__select'  onChange={(e) => handleImportance(e)} type='text' id='todo-select' placeholder='Level of importance'>
              <option value='Low' selected>Low</option>
              <option value='Medium' >Medium</option>
              <option value='High' >High</option>
              <option value='Urgent' >Urgent</option>
            </select>
            <button onClick={postUserTasks} className='todo__submit' id='todo-submit' >Add Item</button>
      </div>
    </div>
  )
}

export default TodoListForm;