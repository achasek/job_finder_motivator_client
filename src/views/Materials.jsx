import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';
import { ProfileSideBar } from '../components';
import EditButton from '../components/Editbutton';
import DeleteButton from '../components/Deletebutton';
import MaterialCommentForm from '../components/MaterialCommentForm';
import '../styles/material.css';
import { ConstContext } from '../App';

const Resources = () => {
  const [materials, setMaterials] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();
  const { BACK_URI } = useContext(ConstContext);

  useEffect(() => {
    console.log({ user });
    const getMaterials = async () => {
      const token = await getAccessTokenSilently();
      const config = {
        url: `${BACK_URI}/api/material/`,
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization': `bearer ${token}`,
        },
      };
      const { data, status, error } = await callExternalApi({ config });
      console.log({ status }, { data });
      if (status.code === 200) {
        console.log({ data: data.posts });
        setMaterials(data.posts);
      }
    };
    getMaterials();
  }, []);
  
  const handleDelete = (materialId) => {
    const updatedMaterials = materials.filter((material) => material._id !== materialId);
    setMaterials(updatedMaterials);
  };

  return (
    <div className="resources__page">
      <ProfileSideBar />
        <h1 className='resource__title'> Materials</h1>
      <div className="resources__container">
      {materials?.map((material) => (
      <div className='materials__Pcontainer'>
      <div className="each__resource" key={material._id}>
        <h2>{material.name}</h2>
        <p>{material.content}</p>
        {console.log("RIGHT HERE !!!!!",{material})}
        <p>
          Likes: {material.likes} | Dislikes: {material.dislikes} | Comments: {material.comments.length}
        </p>
        <hr /> 
        <MaterialCommentForm material={material} />
        <hr />
          {material.comments.length > 0 && (
            <div>
            <h3>Scoll Comments Below:</h3>
          <div className="comments__box">
            {material.comments.map((comment) => (
            <div key={comment._id}>
              <div className='comment__author'>
            <p>User: {comment.owner_name}</p>
                </div>
            <p>~ {comment.content}</p>
            <hr />
          </div>
          ))}
          </div>
              </div>
          )}
      </div>
        <EditButton material={material} />
        <DeleteButton material={material} onDelete={handleDelete} />
      </div>
      ))}
      </div>
    </div>
  );
};

export default Resources;
