import { callExternalApi } from '../services/external-api.service';
import React, { useContext, useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { ConstContext } from '../App';


const MaterialLikeButton = ({ material, getMaterials }) => {
    console.log("Material Likes console.log ",material.likes.length)
    const { getAccessTokenSilently, user } = useAuth0();
    const { BACK_URI } = useContext(ConstContext);
    const [likes, setLikes] = useState(material.likes);
    const [isLiked, setIsLiked] = useState(false);

const handleLike = async () => {
        const token = await getAccessTokenSilently();
        const config = {
          url: `${BACK_URI}/api/material/like/${material._id}`,
          method: 'PUT',
          headers: {
            'content-type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        };
        const { status, data } = await callExternalApi({ config });
        if (status?.code === 200) {
          setLikes(data.likes);
          setIsLiked(true);
          getMaterials();
        }
      };

  useEffect(() => {
    const userLiked = material.likes.find((like) => like.owner_id === user.sub);
    setIsLiked(userLiked !== undefined);
  }, [material.likes, user.sub]);

  return (
    <div className='like__box'>
        <p>Click to Like this Post</p>
        <button className="like__button" onClick={handleLike}>
            <ion-icon size="large" name="happy-outline"></ion-icon>
        </button>
    </div>
  );
};

export default MaterialLikeButton;
