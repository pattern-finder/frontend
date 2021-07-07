import React from 'react';
import { useEffect, useState } from 'react';
// import { useState } from 'react';
import toast from 'react-hot-toast';
import Axios from '../axios-config';
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';
// import { ProfileElements } from '../components/ProfileElements';
import icone from '../assets/profile-icon.png'


type ProfileAttributes = {
  _id: string;
  username: string;
  // password: string;
  email: string;
  // icone: string;
}

export const Profile = (props: { match: { params: { id: string } } }) => {

  const getUser = useAuthUser();
  const [user, setUser] = useState({} as ProfileAttributes);
  // const [email, setEmail] = useState('');
  const isAuth = useIsAuthenticated();

  const userTest = getUser();
  console.log(userTest);

  // useState(() => {
  //   setUser(userTest?.content);
  // });

  useEffect(() => {
    const fetchUsers = async () => {
      Axios.get('/users')
        .then(({ data }) => {
          console.log(data.content[0]);
          if (userTest?.sub == data.content[0]._id)
          setUser(data.content[0])
          // data.content.map((userInfo) => {
          //   console.log(userInfo)
          // })
        })
        .catch((err) => {
          if (err.isAxiosError) {
            toast.error(
              `Could not load profile: ${err.response.data.message}`,
            );
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
          src={ icone }
        />
      </div>
      <div className="username">
        <div className="userLabel">
          Username :
        </div>
        <div className="userArea">
          {user?.username}
        </div>
      </div>
      <div className="email">
        <div className="emailLabel">
          Email :
        </div>
        <div className="emailArea">
          {user?.email}
        </div>
      </div>

    </div>


    {/*<div className="test">
    <p>profile</p>
    {/*profile.map((profile, index) => (
      <ProfileElements profile={profile} key={'profile-${index}'} />
    )) * /}
    {isAuth() ? (
      <div className="m-auto">
      <i className="fas fa-sign-out-alt pr-2" />
      Sign out
      {getUser() ? (
        <div className="m-auto">
        <p>ok
        {user._id}</p>
        </div>
      ) : (
        <div className="m-auto">
        ko
        </div>
      )}
      </div>
    ) : (
      <div className="m-auto">
      Not connected
      {getUser() ? (
        <div className="m-auto">
        ok
        </div>
      ) : (
        <div className="m-auto">
        ko
        </div>
      )}
      </div>
    )}
    </div>*/}
    </>
  );
};
