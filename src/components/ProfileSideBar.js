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
import { Link } from 'react-router-dom';

const ProfileSideBar = () => {
    const {open, setOpen, setModalType} = useContext(DataContext)

    function settingsModal() {
        setOpen(true)
        setModalType(<Settings />)

    }

  return (
    <div className='sidebar__block'>
    <div className='sidebar__container'>
        <div className="nav-list__container">

            <h4 className='titles'>Basic</h4>
            <div className='basic__wrapper'>
           
            <div><Link className='sidebar__text' to='/social' ><MdOutlineDashboardCustomize/> Social Dashboard </Link></div>
            </div>
            
            <h4 className='titles'>Tools</h4>
            <div className='tools__wrapper'>
            <div><a className='sidebar__text' href='http://www.google.com' ><BsKanban/> Kanban </a></div>
            <div><a className='sidebar__text' href='/calendar' ><AiOutlineCalendar /> Calendar </a></div>
            <div><Link className='sidebar__text' to='/add/resources' ><BsPen /> Add a Material </Link></div>
            <div><Link className='sidebar__text' to='/resources' ><BiNotepad /> Materials </Link></div>
            <div><Link className='sidebar__text' to='/' ><ion-icon name="document-attach-outline"></ion-icon> Resources </Link></div>
            </div>

            <h4 className='titles'>Other</h4>
            <div className='other__wrapper'>
            <div><a className='sidebar__text' href='http://www.google.com' ><AiFillFileExcel /> Report an issue </a></div>
            <div style={{cursor:"pointer"}} onClick={settingsModal}><a className='sidebar__text' href='http://www.google.com' ><VscSettingsGear onClick={settingsModal}/> Settings </a></div>
            <div><a className='sidebar__text' href='http://www.google.com' ><BiLogOut /> Sign out </a></div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ProfileSideBar