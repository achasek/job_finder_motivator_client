import React from 'react'
import { PageLayout } from '../components/page-layout';
import { useAuth0 } from '@auth0/auth0-react';

function TodoList() {

  // const { user } = useAuth0();

  // if (!user) {
  //   return null;}
  
  return(
    <div className='todo__form'>
      <div className='form__title'>
        <h1>Add an item to your todo list!</h1>
      </div>
      <div className='form'>
        <form>
          <label className='todo__input-label'>Task</label>
          <input className='todo__input' type='text' id='todo-input' placeholder='New item'></input>
          <label className='todo__select-label'>Level Of Importance</label>
            <select className='todo__select' type='text' id='todo-select' placeholder='Level of importance'>
              <option value='1' selected>Low</option>
              <option value='1' >Medium</option>
              <option value='1' >High</option>
              <option value='1' >Urgent</option>
            </select>
            <button value='Submit' type='submit' className='todo__submit' id='todo-submit' >Add Item</button>
        </form>
      </div>
    </div>
  )
}

export default TodoList;