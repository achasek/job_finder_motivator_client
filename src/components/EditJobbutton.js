import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';
import { ConstContext } from '../App';
import { useNavigate } from "react-router-dom";


const EditJobButton = ({ job, getJobs }) => {
  const { getAccessTokenSilently, user } = useAuth0();
  const { BACK_URI } = useContext(ConstContext);
  const navigate = useNavigate();
  const [position, setPosition] = useState(job.name);
  const [description, setDescription] = useState(job.content);
  const [editing, setEditing] = useState(false);

  console.log('User:   ',user)
  console.log('Job: ', job)

  const handleEdit = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      url: `${BACK_URI}/api/job/${job._id}`,
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: { position, description },
    };
    const { data, status } = await callExternalApi({ config });
    if (status.code === 200) {
      console.log('Job updated:', data.job);
      getJobs();
      navigate('/jobs');
    } else {
      console.error('Failed to update job:', status);
      navigate('/jobs');
      setEditing(false);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setPosition(job.position);
    setDescription(job.description);
    setEditing(false);
  };

  if (!editing) {
    return(
    <button className='btn__edit1' onClick={() => setEditing(true)}>Edit</button>
    )
  }

  return (
    <>
      <label className='labels1'>New Position</label>
      <br/>
      <input placeholder='New Title' value={position} onChange={(e) => setPosition(e.target.value)} />
      <br/>
      <label className='labels1'>New Description</label>
      <br/>
      <input placeholder='New Description' value={description} onChange={(e) => setDescription(e.target.value)} />
      <br />
      <button className='btn__save1' onClick={handleEdit}>Save</button>
      <button className='btn__cancel1' onClick={handleCancel}>Cancel</button>
    </>
  );
};

export default EditJobButton;
