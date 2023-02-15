import React from 'react'
import "../styles/profile.css"
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { BsKanban } from 'react-icons/bs';
import { AiOutlineCalendar } from 'react-icons/ai';
import { BiNotepad } from 'react-icons/bi';
import { BsPen } from 'react-icons/bs';
import { GrResources } from 'react-icons/gr';
import { AiFillFileExcel } from 'react-icons/ai';
import { VscSettingsGear } from 'react-icons/vsc';
import { BiLogOut } from 'react-icons/bi';


const ProfileSideBar = () => {
  return (
    <div className='sidebar-container'>
        <div className="nav-list-container">

            <h4 className='titles'>basic</h4>
            <div className='basic-wrapper'>
           
            <div><MdOutlineDashboardCustomize/> Dashboard</div>
            </div>
            
            <h4 className='titles'>tools</h4>
            <div className='tools-wrapper'>
            <div><BsKanban/> Kanban</div>
            <div><AiOutlineCalendar /> Calendar</div>
            <div><BiNotepad /> Applications</div>
            <div><BsPen /> Materials</div>
            <div><GrResources /> Resources</div>
            </div>

            <h4 className='titles'>other</h4>
            <div className='other-wrapper'>
            <div><AiFillFileExcel /> Report an issue</div>
            <div><VscSettingsGear /> Settings</div>
            <div><BiLogOut /> Sign out</div>
            </div>
        </div>
    </div>
  )
}

export default ProfileSideBar