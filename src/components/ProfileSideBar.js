import React from 'react'
import "../styles/profile.css"
import { useContext } from 'react';
import { DataContext } from '../App';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { BsKanban } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { BsPen } from 'react-icons/bs';
import { GrResources } from 'react-icons/gr';
import { AiFillFileExcel } from 'react-icons/ai';
import { VscSettingsGear } from 'react-icons/vsc';
import { BiLogOut } from 'react-icons/bi';
import Settings from './Settings';


const ProfileSideBar = () => {
    const {open, setOpen, setModalType} = useContext(DataContext)
    
    function settingsModal() {
        setOpen(true)
        setModalType(<Settings />)

    }

  return (
    <div className='sidebar__container'>
        <div className="nav-list__container">

            <h4 className='titles'>Basic</h4>
            <div className='basic__wrapper'>
           
            <div><a href='http://www.google.com' ><MdOutlineDashboardCustomize/> Dashboard </a></div>
            </div>
            
            <h4 className='titles'>Tools</h4>
            <div className='tools__wrapper'>
            <div><a href='http://www.google.com' ><BsKanban/> Kanban </a></div>
            <div><a href='http://www.google.com' ><AiOutlineCalendar /> Calendar </a></div>
            <div><a href='http://www.google.com' ><BiNotepad /> Applications </a></div>
            <div><a href='http://www.google.com' ><BsPen /> Materials </a></div>
            <div><a href='/resources' ><GrResources /> Resources </a></div>
            </div>

            <h4 className='titles'>Other</h4>
            <div className='other__wrapper'>
            <div><a href='http://www.google.com' ><AiFillFileExcel /> Report an issue </a></div>
            <div style={{cursor:"pointer"}} onClick={settingsModal}><a href='http://www.google.com' ><VscSettingsGear onClick={settingsModal}/> Settings </a></div>
            <div><a href='http://www.google.com' ><BiLogOut /> Sign out </a></div>
            <div className='logo__sidebar'> </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileSideBar