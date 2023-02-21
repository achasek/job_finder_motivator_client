import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { callExternalApi } from '../services/external-api.service';
import { ProfileSideBar} from "../components";
// import { CreateMaterialForm } from '../components'
import "../styles/resources.css";

const Resources = () => {
  const [materials, setMaterials] = useState([]);
  const { getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const accessToken = await getAccessTokenSilently();
      const result = await axios.get('/materials', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setMaterials(result.data.material);
    };
    fetchData();
  }, [getAccessTokenSilently]);

  return (
    <div className='resources__page'>
        <ProfileSideBar />
        <div className='resources__container'>
            <h1>Your Resources</h1>
      {materials.map((material) => (
        <div key={material._id}>
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