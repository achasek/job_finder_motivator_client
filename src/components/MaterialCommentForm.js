import React, { useState, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';
import { ConstContext } from '../App';
import { useNavigate } from "react-router-dom";

const MaterialCommentForm = ({ material , getMaterials }) => {
  const [comment, setComment] = useState('');
  const { getAccessTokenSilently } = useAuth0();
  const { BACK_URI } = useContext(ConstContext);
  const navigate = useNavigate();

  console.log('material id # ----------------> ',material._id )
  const materialId = material._id ;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    const config = {
      url: `${BACK_URI}/api/material/comment/${materialId}`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${token}`,
      },
      data: { content: comment },
    };
    console.log(config)
    const { data, status } = await callExternalApi({ config });
    if (status?.code === 201) {
      getMaterials();
      console.log('Comment created', {data}, '------', {status});
      navigate('/materials');
      setComment('');
    } else {
      console.error("This is your error:", {data}, {status}, {material});
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        className='comment__box'
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button className='post__comment' type="submit">Post</button>
    </form>
  );
};

export default MaterialCommentForm;
