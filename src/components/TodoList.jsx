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



export default function TodoList(){ 
  const {open, setOpen, modalType, setModalType} = useContext(DataContext)
  const { currUser } = useContext(UserContext)
  const [userTasks, setUserTasks] = useState()
  const email = currUser.email
  const BACK_URI = process.env.REACT_APP_API_SERVER_URL;

  useEffect(() => {
    axios.get(`${BACK_URI}/api/user/tasks/${email}`)
    .then(response => {
      console.log(response.data.userTasks)
      setUserTasks(response.data.userTasks)
    })
  }, [])

  const postModal = () => {
    setOpen(true)
    setModalType(<TodoListForm email={email}/>)
    }

  const taskModal = (added, task, id, taskName) => {
    setOpen(true)
    setModalType(<TaskContent taskName={taskName} added={added} task={task} id={id}/>)
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
        <div onClick={kanbanModal} className='kanban'><BsKanban/></div>
        <div onClick={postModal} className='add__btn'>+</div>
        </div>
        </div>
        <div className='unordered__list'>
          {userTasks?.map(({ taskName, comments, importance, isComplete, task, added, _id }) => (
              <li onClick={(e) => taskModal(added,  task, _id, taskName)} className='list__items'>
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