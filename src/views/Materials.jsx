import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';
import { ProfileSideBar } from '../components';
import EditButton from '../components/Editbutton';
import DeleteButton from '../components/Deletebutton';
import MaterialCommentForm from '../components/MaterialCommentForm';
import '../styles/material.css';
import { ConstContext } from '../App';
import MaterialLikeButton from '../components/LikeMaterialButton';

const Resources = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [materials, setMaterials] = useState([]);
  const { BACK_URI } = useContext(ConstContext);

<<<<<<< HEAD
  const getMaterials = async () => {
    const token = await getAccessTokenSilently();
    const config = {
      url: `${BACK_URI}/api/material/`,
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${token}`,
      },
=======
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
      if (status?.code === 200) {
        console.log({ data: data.posts });
        setMaterials(data.posts);
      }
>>>>>>> 350f8b02120cf8950a71b4f5e0139808bfbd0dbe
    };
    const { data, status, error } = await callExternalApi({ config });
    console.log({ status }, { data });
    if (status.code === 200) {
      console.log({ data: data.posts });
      setMaterials(data.posts);
    }
  };

  useEffect(() => {
    console.log('Hello');
    getMaterials();
  }, []);
  
  const handleDelete = (materialId) => {
    const updatedMaterials = materials.filter((material) => material._id !== materialId);
    setMaterials(updatedMaterials);
  };
  
  const handleLike = async (materialId) => {
    const token = await getAccessTokenSilently();
    const config = {
      url: `${BACK_URI}/api/material/${materialId}/like`,
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `bearer ${token}`,
      },
    };
    const { data, status, error } = await callExternalApi({ config });
    console.log({ status }, { data });
    if (status.code === 200) {
      console.log({ data });
      getMaterials();
    }
  };

  return (
    <div className="resources__page">
      <ProfileSideBar />
        <h1 className='resource__title'> Materials</h1>
      <div className="resources__container">
      {materials?.map((material) => (
      <div className='materials__Pcontainer'>
        <h2 className='material__title'>{material.name}</h2>
        <MaterialLikeButton material={material} getMaterials={getMaterials} />
        <br/>
      <div className="each__resource" key={material._id}>
        <h3>Content :</h3>
        <p>{material.content}</p>
        <hr />
        {console.log("RIGHT HERE !!!!!",{material})}
        <p>
          Likes: {material.likes.length} <br/> Comments: {material.comments.length}
        </p>
        <hr /> 
        <MaterialCommentForm material={material} getMaterials={getMaterials} />
        <hr />
          {material.comments.length > 0 && (
            <div>
            <h3>Scroll Comments Below:</h3>
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
        <EditButton material={material} getMaterials={getMaterials} />
        <DeleteButton material={material} onDelete={handleDelete} getMaterials={getMaterials} />
      </div>
      ))}
      </div>
    </div>
  );
};

export default Resources;
