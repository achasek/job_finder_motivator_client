import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';
import { ProfileSideBar} from "../components";
// import { CreateMaterialForm } from '../components'
import "../styles/resources.css";
import { ConstContext } from '../App';

const Resources = () => {
  const [materials, setMaterials] = useState([]);
  const { getAccessTokenSilently, user } = useAuth0();
  const { BACK_URI } = useContext(ConstContext);

  useEffect(() => {
    console.log({user});
    const getMaterials = async () => {
      const token = await getAccessTokenSilently();
      const config = {
          // change
          url: `${BACK_URI}/api/material/`,
          // change to update method
          method: "GET",
          headers: {
              "content-type": "application/json",
              "Authorization": `bearer ${token}`
          }
      }
      const { data, status, error } = await callExternalApi({config});
      console.log({status}, {data})
      if (status.code === 200){
        console.log({data: data.posts});
        setMaterials(data.posts);
      }
    }
    getMaterials();
  }, [])

  return (
    <div className='resources__page'>
        <ProfileSideBar />
        <div className='resources__container'>
            <h1>Your Resources</h1>
      {materials?.map((material) => (
        <div className='each__resource' key={material._id}>
          <h2>{material.name}</h2>
          <p>{material.content}</p>
          <p>
            Likes: {material.likes} | Dislikes: {material.dislikes} | Comments: {material.comments.length}
          </p>
          <hr />
        </div>
      ))}
        </div>
    </div>
  );
};

export default Resources