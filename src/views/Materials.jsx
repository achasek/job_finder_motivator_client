import React, { useState, useEffect, useContext } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';
import { ProfileSideBar } from '../components';
import EditButton from '../components/Editbutton';
import DeleteButton from '../components/Deletebutton';
import MaterialCommentForm from '../components/MaterialCommentForm';
import '../styles/material.css';
import { ConstContext, UserContext } from '../App';
import MaterialLikeButton from '../components/LikeMaterialButton';

const Materials = () => {
  const { getAccessTokenSilently, user } = useAuth0();
  const [materials, setMaterials] = useState([]);
  const { BACK_URI } = useContext(ConstContext);
  const { currUser } = useContext(UserContext);

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
      // console.log({ data: data.posts });
      setMaterials(data.posts);
    }
  };

  useEffect(() => {
    // console.log('Hello');
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
      // console.log({ data });
      getMaterials();
    }
  };

  return (
    <div className="resources__page">
      <ProfileSideBar />
      <h1 className='resource__title'> Materials</h1>
        {/* -------------------------- Material title and Content section below ------------------------- */}
      <div className="resources__container">
        {materials?.map((material) => (
          <div className='materials__Pcontainer' key={material._id}>
            <h2 className='material__title'>{material.name}</h2>
            <MaterialLikeButton material={material} getMaterials={getMaterials} />
            <br/>
            <div className="each__resource">
              <h3>Content :</h3>
              <p className='content__container'>{material.content}</p>
              <hr />
                {/* -------------------------- like and comment total section below ------------------------- */}
              <p>
                Likes: {material.likes.length} <br/> Comments: {material.comments.length}
              </p>
              <hr /> 
              <MaterialCommentForm material={material} getMaterials={getMaterials} />
              <hr />
              {material.comments.length > 0 && (
              <div>
                {/* -------------------------- comments section below ------------------------- */}
                <h3>Scroll Comments Below: <ion-icon name="caret-down-outline"></ion-icon></h3>
                <div className="comments__box">
                  {material.comments.map((comment) => (
                  <div key={comment._id}>
                    <div className='comment__author'>
                      <img className='comment__pic' src={comment.owner_picture} />
                      <p>User: <h4>{comment.owner_name}</h4></p>
                <p className='comment'>Comment: <h4>{comment.content}</h4></p>
                  </div>
                <hr />
                <hr />
                </div>
              ))}
              </div>
            </div>
          )}
          </div>
            {/* -------------------------- edit/delete section below ------------------------- */}
          {(currUser._id === material.owner)?
          <div className='edit__delete'>
        <EditButton material={material} getMaterials={getMaterials} />
        <DeleteButton material={material} onDelete={handleDelete} getMaterials={getMaterials} />
          </div>
          :null }
        </div>
      ))}
      </div>
    </div>
  );
};

export default Materials;
