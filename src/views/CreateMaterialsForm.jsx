import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { ConstContext } from '../App';
import { callExternalApi } from '../services/external-api.service';
import "../styles/resources.css";
import { useNavigate } from "react-router-dom";

const CreateMaterialForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [name, setName] = useState('');
  const [content, setContent] = useState('');
  const { BACK_URI } = useContext(ConstContext);
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = await getAccessTokenSilently();
    const config = {
      url: `${BACK_URI}/api/material`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        "Authorization": `Bearer ${token}`,
      },
      data: {
        name,
        content,
      },
    };
    try {
      const { data, status, error } = await callExternalApi({config});
      console.log({data});
      console.log({status});
      console.log({error});
      navigate('/resources');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='create__material'>
    <form className='material__form' onSubmit={handleSubmit}>
      <div>
        <h1> Add Resource here</h1>
        <label className='Mlabel' htmlFor="name">Name:</label>
        <br/>
        <input
          className='Minput'
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label className='Mlabel' htmlFor="content">Content:</label>
        <br/>
        <textarea
          className='Minput'
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
};

export default CreateMaterialForm;