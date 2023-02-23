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
      // Optional: Add a success message or trigger a rerender
    } else {
      console.error('Failed to update material:', status);
      navigate('/resources');
      setEditing(false);
      // Optional: Add an error message
    }
    setEditing(false);
  };

  if (!editing) {
    return <button className='btn1' onClick={() => setEditing(true)}>Edit</button>;
  }

  return (
    <>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <input value={content} onChange={(e) => setContent(e.target.value)} />
      <br />
      <button onClick={handleEdit}>Save</button>
    </>
  );
};

export default EditButton;
