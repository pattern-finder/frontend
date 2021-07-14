import React from 'react';
import { useEffect, useState } from 'react';
// import { useState } from 'react';
import toast from 'react-hot-toast';
import Axios from '../axios-config';
import { useAuthUser } from 'react-auth-kit';
// import { ProfileElements } from '../components/ProfileElements';
import icone from '../assets/profile-icon.png';

type ProfileAttributes ={
  _id: string;
  username: string;
  // password: string;
  email: string;
  icone: string;
};

export const Profile = (props: { match: { params: { id: string } } }) => {
  const getUser = useAuthUser();
  const [user, setUser] = useState({} as ProfileAttributes);

  const userTest = getUser();
  console.log(userTest);

  useEffect(() => {
    const fetchUsers = async () => {
      Axios.get('/users')
        .then(({ data }) => {
          data.content.map((userProfile: ProfileAttributes) => {
            if(userTest?.sub == userProfile._id) setUser(userProfile)
          })
        })
        .catch((err) => {
          if (err.isAxiosError) {
            toast.error(`Could not load profile: ${err.response.data.message}`);
          } else {
            toast.error(`Could not load profile: ${err}`);
          }
        });
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="h-min text-center bg-gray-600 overflow-hidden">
        <div className="h-auto text-center bg-gray-600 rounded p-5">
          <img
            className="max-h-full h-20 object-contain bg-cover bg-center mx-auto"
            src={icone}
          />
        </div>
        <div className="username">
          <div className="userLabel">Username :</div>
          <div className="userArea">{user?.username}</div>
        </div>
        <div className="email">
          <div className="emailLabel">Email :</div>
          <div className="emailArea">{user?.email}</div>
        </div>
      </div>
    </>
  );
};
