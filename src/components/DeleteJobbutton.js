import React, { useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';
import { ConstContext } from '../App';

const DeleteJobButton = ({ job, onDelete }) => {
const { getAccessTokenSilently } = useAuth0();
const { BACK_URI } = useContext(ConstContext);

  const handleDelete = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      url: `${BACK_URI}/api/job/${job._id}`,
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${token}`,
      },
    };
    const { status, data, error } = await callExternalApi({ config });
    console.log({status}, {data});
    if (status.code === 200) {
      console.log('Job deleted');
      onDelete(job._id);
    } else {
      console.error('Failed to delete job:', status);
    }
  };

  return (
    <button className='btn__delete' onClick={handleDelete}>Delete</button>
  );
};

export default DeleteJobButton;
