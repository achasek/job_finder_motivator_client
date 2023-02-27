import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';
import { ConstContext } from '../App';
import { useNavigate } from "react-router-dom";


const EditButton = ({ material }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const { BACK_URI } = useContext(ConstContext);
  const [name, setName] = useState(material.name);
  const [content, setContent] = useState(material.content);
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();


  const handleEdit = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      url: `${BACK_URI}/api/material/${material._id}`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: { name, content },
    };
    const { data, status } = await callExternalApi({ config });
    if (status.code === 200) {
      console.log('Material updated:', data.post);
      navigate('/resources');
    } else {
      console.error('Failed to update material:', status);
      navigate('/resources');
      setEditing(false);
    }
    setEditing(false);
  };

  if (!editing) {
    return <button className='btn__edit' onClick={() => setEditing(true)}>Edit</button>;
  }

  return (
    <>
      <input placeholder='New Title' onChange={(e) => setName(e.target.value)} />
      <input placeholder='New Description' onChange={(e) => setContent(e.target.value)} />
      <br />
      <button className='btn__save' onClick={handleEdit}>Save</button>
    </>
  );
};

export default EditButton;
