import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MaterialModal from './MaterialModal';
import { BsKanban } from 'react-icons/bs';
import TodoListForm from './TodoListForm';
import TaskContent from './TaskContent';
import '../styles/todo.css'
import { Kanban } from '../views';
import { DataContext } from '../App';
import { UserContext } from '../App';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';


export default function TodoList(){ 
  const {open, setOpen, modalType, setModalType} = useContext(DataContext)
  const { currUser } = useContext(UserContext)
  const [userTasks, setUserTasks] = useState()
  const email = currUser.email
  const BACK_URI = process.env.REACT_APP_API_SERVER_URL;
  const { getAccessTokenSilently } = useAuth0();

  const handleGetTasks = async () => {
    const token = await getAccessTokenSilently();
    const config = {
        url: `${BACK_URI}/api/task/`,
        method: "GET",
        headers: {
            "content-type": "application/json",
            "Authorization": `bearer ${token}`
        }
    }
    const { data, status, error } = await callExternalApi({config});
    if (status.code === 200){
      console.log({data: data.tasks});
      setUserTasks(data.tasks);
    }
  }

  useEffect(() => { handleGetTasks(); }, [])

  const closeModal = () => {
    setOpen(false);
  }

  const postModal = () => {
    setOpen(true)
    setModalType(<TodoListForm email={email} onClose={handleGetTasks} closeModal={closeModal} />)
    }

  const taskModal = (added, task, id, taskName) => {
    setOpen(true)
    setModalType(<TaskContent taskName={taskName} added={added} task={task} id={id} onClose={handleGetTasks} closeModal={closeModal} />)
  }

  const kanbanModal = () => {
    setOpen(true)
    setModalType(<Kanban />)
  }
  

  return (
  <div className='todo-list__container'>
        <div className='todo__innards'>
          <div className='top__bar'>
        <h1>Tasks</h1>
        <div className='task__btns'>
        <div onClick={postModal} className='add__btn'>+</div>
        </div>
        </div>
        <div className='unordered__list'>
          {userTasks?.map(({ taskName, comments, importance, isComplete, task, added, _id }) => (
              <li onClick={(e) => taskModal(added,  task, _id, taskName)} className='list__items' key={_id}>
                <ListItemText  className='list__item' primary={taskName} secondary={task}  /> <input type="checkbox" />
                
                <Divider />
              </li>
               
          ))}
        </div>
        </div> 
        <MaterialModal component={modalType} />
    </div>
    
  );
}