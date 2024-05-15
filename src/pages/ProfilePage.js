import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    axios.get(
      `http://localhost:3000/api/users/profile`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('access_token')}`,
        }
      }
    ).then((response) => {
      setUser(response.data);
    }).catch((error) => {
      console.error(error);
    })
  }, [])
  
  return (
    <div id='profilei_wrapper'>
      프로필 페이지
      {user && 
        <div>
        <p>user.id</p>
        <p>user.nickname</p>
        </div>
      }
    </div>
  )
}

export default ProfilePage;