import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { ConstContext } from '../App';
import { callExternalApi } from '../services/external-api.service';
import "../styles/material.css";
import { useNavigate } from "react-router-dom";
import { ProfileSideBar } from "../components";

const CreateJobForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [position, setPosition] = useState('');
  const [description, setDescription] = useState('');
  const [jobData, setJobData] = useState({});
  const { BACK_URI } = useContext(ConstContext);
  const navigate = useNavigate();

  const handleChange = (evt) => {
    // debugger;
    const tmpData = {...jobData};
    if ("value" != '') {
        tmpData[evt.target.name] = evt.target.value;
    } else {
        tmpData[evt.target.name] = evt.target.checked;
    }
    setJobData(tmpData);
    console.log("this is the form data: ", jobData)
};

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await getAccessTokenSilently();
    const config = {
      url: `${BACK_URI}/api/job/`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      data: {...jobData},
    };
   
      const { data, status, error } = await callExternalApi({config});
      if (status && status.code >= 200 && status.code < 300 ) {
        console.log({data});
        // console.log({status});
        // console.log({error});
        navigate('/jobs');
      } else {
        console.error(error);
      }
    
  };

  return (
    <div className='create__job'>
      <form className='job__form' onSubmit={handleSubmit}>
        <h1> Add Job Details </h1>
        <div>
          <label className='Jlabel' htmlFor="company">Company:</label>
          <br/>
          <input className='Jinput' type="text" name='company' id="company" value={jobData?.company} onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label className='Jlabel' htmlFor="position">Position:</label>
          <br/>
          <input className='Jinput' type="text" name='position' id="position" value={jobData?.position} onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label className='Jlabel' htmlFor="url">URL:</label>
          <br/>
          <input className='Jinput' type="text" name='url' id="url" value={jobData?.url} onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label className='Jlabel' htmlFor="description">Description:</label>
          <br/>
          <textarea className='Jinput' name='description' id="description" value={jobData?.description} onChange={(e) => handleChange(e)} />
        </div>
        <div>
          <label className='Jlabel' htmlFor="status">Status:</label>
          <br/>
          <select className='Jinput' name="status" id="status" value={jobData?.status} onChange={(e)=>{handleChange(e)}} >
            <option>Interested</option>
            <option>Applied</option>
            <option>Interviewing</option>
            <option>Offer</option>
            <option>Rejection</option>
          </select>
        </div>
        <div>
          <label className='Jlabel' htmlFor="date_applied">Date Applied:</label>
          <br/>
          <input type='date' name="date_applied" id="date_applied" onChange={(e)=>{handleChange(e)}} defaultValue={null} />
        </div>
        <div>
          <label className='Jlabel' htmlFor="date_response">Date of Response:</label>
          <br/>
          <input type='date' name="date_response" id="date_response" onChange={(e)=>{handleChange(e)}} defaultValue={null} />
        </div>
        <button type="submit">Submit</button>
      </form>
      <ProfileSideBar />
    </div>
  );
};

export default CreateJobForm;