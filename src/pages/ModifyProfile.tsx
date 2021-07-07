import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import Axios from '../axios-config';
import icone from '../assets/profile-icon.png'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit';


// import { ChallengeListitem } from '../components/ChallengeListItem';

type ProfileAttributes = {
  _id: string;
  username: string;
  // password: string;
  email: string;
  // icone: string;
}

export const ModifyProfile = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState([] as File[]);

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

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = [...image];

    if (e.target.files && e.target.files?.length > 0) {
      files.push(e.target.files[0]);
    }

    setImage(files);
  }

  function removeImage(index: number) {
   const currentImages = [...image];
   currentImages.splice(index, 1);

   setImage(currentImages);
 }

  return (
    <div className="v-auto text-center bg-gray-600 overflow-hidden">
      <div className="header">Profile</div>
      <div className="h-auto text-center bg-gray-600 rounded p-5 flex flex-col items-center">
      {/*<div className="h-auto text-center bg-gray-600 rounded p-5">*/}
        <img
          className="max-h-full h-20 object-contain bg-cover bg-center mx-auto"
          src={ icone }
        />
        <div className="grid grid-cols-5 gap-4 rounded m-5 p-10">
        {image.map((image, index) => (
          <div
            key={`image-${index}`}
            className="h-100 text-center bg-gray-600 rounded p-4 text-center relative overflow-hidden"
          >
            <button
              className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 py-1 px-3 rounded-bl-lg"
              onClick={(_) => removeImage(index)}
            >
              <i className="fas fa-times" />
            </button>
            <div className="flex h-full">
              <img
                alt="user defined"
                className="w-full max-h-full object-contain m-auto pb-4"
                src={URL.createObjectURL(image)}
              />
            </div>
          </div>
        ))}
      </div>

            <label className="w-32 flex flex-col items-center p-5 bg-blue-500 hover:bg-blue-700 rounded-md shadow-md tracking-wide cursor-pointer">
              <i className="fas fa-cloud-upload-alt fa-2x"></i>
              <span className="mt-2 text-base ">Browse</span>
              <input type="file" className="hidden" onChange={onFileChange} />
            </label>
          </div>
      <div className="content">
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
              <input
                className="text-black"
                alt={user.username}
                type="text"
                name="username"
                placeholder="username"
                onChange={(e) => setUsername(e.target.value)}
              />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
              <input
                className="text-black"
                alt=""
                type="password"
                name="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>
          <div className="form-group">
            <label htmlFor="password">Email</label>
              <input
                className="text-black"
                alt={user.email}
                type="text"
                name="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>
        </div>
      </div>
      <div className="footer">
      {/* <Link to="/" className="nav-links"> */}
        <button
          type="button"
          className="bg-blue-500 rounded-lg px-6 py-2"
        >
          Save
        </button>
    </div>
  </div>

  );
};
