import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { ConstContext } from '../App';
import { callExternalApi } from '../services/external-api.service';
import "../styles/resources.css";

const CreateMaterialForm = () => {
  const { getAccessTokenSilently } = useAuth0();
  const [name, setName] = useState('name');
  const [content, setContent] = useState('content');
  const { BACK_URI } = useContext(ConstContext);

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
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='create__material'>
    <form className='material__form' onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="content">Content:</label>
        <textarea
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