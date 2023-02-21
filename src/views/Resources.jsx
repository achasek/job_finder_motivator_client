import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import "../styles/resources.css";
import { ProfileSideBar } from "../components";
import axios from 'axios';
import { DataContext } from '../App';
import { UserContext } from '../App';


const Resources = () => {
    const { currUser } = useContext(UserContext)
    const [resources, setResources] = useState()
    const email = currUser.email
    const BACK_URI = process.env.REACT_APP_API_SERVER_URL;

    useEffect(() => {
        axios.get(`${BACK_URI}/api/user/material/${email}`)
        .then(response => {
          console.log(response.data.resources)
          setUserTasks(response.data.resources)
        })
      }, [])


  return (
    <div className='resource__page'>
        <div className='resources__sidebar'>
        < ProfileSideBar />
        <div className='resources__container'>
            <h1>Resources</h1>
        </div>
        </div>
    </div>
  )
}

export default Resources