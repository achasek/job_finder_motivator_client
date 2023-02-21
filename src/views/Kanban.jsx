import React from 'react'
import "../styles/kanban.css"
import { useEffect } from 'react';
import ListItemText from '@mui/material/ListItemText';
import { BsTrash } from 'react-icons/bs';

const Kanban = () => {

  useEffect(() => {

 
    const draggables = document.querySelectorAll('.kanban-listitem__draggable')
    const containers = document.querySelectorAll('.kanban-inside__containers')
    console.log("containers", containers)

    draggables.forEach(draggable => {
      draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
        console.log("dragginx")
      })
      draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
      })
    })

    containers.forEach(container => {
      container.addEventListener('dragover', e => {
        e.preventDefault()
        const afterElement = getDragAfterElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        if(draggable == null){
          container.appendChild(draggable)
        } else {
          container.insertBefore(draggable, afterElement)
        }
      })
    })

    function getDragAfterElement(container, y) {
     const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

     return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect()
      const offset = y - box.top - box.height / 2
      if(offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child}
      } else {
          return closest
        }
     }, {offset: Number.NEGATIVE_INFINITY}).element
    } 
  }, [])

  return (
    <div className='kanban__container'>
      <h1 className='kanban__title'>Welcome To your Kanban</h1>
      <div style={{position:"absolute", fontSize:"1.5rem", fontWeight:"bold", marginLeft:"85%", top:"7%"}}> <BsTrash /> </div>
      <div style={{position:"absolute", fontSize:"3rem", fontWeight:"bold", marginLeft:"90%", top:"4%"}}> + </div>

      <div className='kanban__wrapper'>
        <div className='kanban-inside__containers'>
            <h1 className='task__status'>Todo</h1>
         <div className='kanban-todo__list'>
              <div className='kanban-listitem__draggable'>
                <ListItemText className='kanban-listitem__text' draggable="true" primary="taskname" secondary="actual task"  /> 
              </div>
         </div>
        </div>

        <div className='kanban-inside__containers'>
        <h1 className='task__status'>In prog</h1>
        <div className='kanban-progress-list'>
          <div className='kanban-listitem__draggable'>
            <ListItemText className='kanban-listitem__text' draggable="true" primary="inpro" secondary="actual task"  /> 
            </div>
        </div>
        </div>

        <div className='kanban-inside__containers'>
        <h1 className='task__status'>finished</h1>
        <div className='kanban-finished__list'>
          <div className='kanban-listitem__draggable'>
            <ListItemText className='kanban-listitem__text' draggable="true" primary="fini" secondary="actual task"  /> 
            </div>
        </div>
        </div>
        </div>

    </div>
  )
}

export default Kanban