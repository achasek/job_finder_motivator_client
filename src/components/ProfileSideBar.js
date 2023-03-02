import "../styles/profile.css"
import React, { useContext, useState, useEffect } from 'react';
import { DataContext, ConstContext, UserContext } from '../App';
import { MdOutlineDashboardCustomize } from 'react-icons/md';
import { BsKanban, BsPen } from 'react-icons/bs';
import { AiOutlineCalendar, AiFillFileExcel } from 'react-icons/ai';
import { BiLogIn,BiLogOut, BiNotepad } from 'react-icons/bi';
import { GrResources } from 'react-icons/gr';
import { VscSettingsGear } from 'react-icons/vsc';
import Settings from './Settings';
import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

const ProfileSideBar = () => {
    const {open, setOpen, setModalType} = useContext(DataContext);
    const { currUser } = useContext(UserContext);
    const { logout, loginWithRedirect } = useAuth0();
    const { LOGOUT_URL } = useContext(ConstContext);
    const [ dispItem, setDispItem ] = useState({});
    
    const handleLogout = () => {
      logout({
        returnTo: LOGOUT_URL,
      });
    };
    
    const handleLogin = async () => {
      await loginWithRedirect({
        prompt: "login",
        appState: {
          returnTo: "/users/login",
        },
        
      });
    };
    
    const handleUser = () => {
      const tmpItem = {}
      if(currUser) {
        tmpItem.text='Sign Out';
        tmpItem.icon=<BiLogOut/>;
        tmpItem.func=handleLogout;
      }else{
        tmpItem.text='Log In';
        tmpItem.icon=<BiLogIn/>;
        tmpItem.func=handleLogin;
      }
      setDispItem(tmpItem);
      console.log({tmpItem}, {currUser});
    }

    function settingsModal() {
        setOpen(true)
        setModalType(<Settings />)
    }

    useEffect(()=>{handleUser()},[currUser])

  return (
    <div className='sidebar__block'>
    <div className='sidebar__container'>
        <div className="nav-list__container">

            <h4 className='titles'>Basic</h4>
            <div className='basic__wrapper'>
           
            <div><Link className='sidebar__text' to='/about' ><BsKanban/> About </Link></div>
            <div><Link className='sidebar__text' to='/profile' ><ion-icon name="document-attach-outline"></ion-icon> Profile </Link></div>
            <div><Link className='sidebar__text' to='/dashboard' ><MdOutlineDashboardCustomize/> Dashboard </Link></div>
            </div>
            
            <h4 className='titles'>Tools</h4>
            <div className='tools__wrapper'>
            <div><Link className='sidebar__text' to='/calendar' ><AiOutlineCalendar /> Calendar </Link></div>
            <div><Link className='sidebar__text' to='/add/materials' ><BsPen /> Add a Material </Link></div>
            <div><Link className='sidebar__text' to='/materials' ><BiNotepad /> Materials </Link></div>
            </div>

            <h4 className='titles'>Other</h4>
            <div className='other__wrapper'>
            <div><a className='sidebar__text' href='/' ><AiFillFileExcel /> Report an issue </a></div>
            <div style={{cursor:"pointer"}} onClick={settingsModal}><Link className='sidebar__text' to='/profile' ><VscSettingsGear onClick={settingsModal}/> Profile </Link></div>
            <div style={{cursor:"pointer"}} onClick={dispItem.func} ><p className='sidebar__text' >{dispItem.icon} {dispItem.text} </p></div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ProfileSideBar