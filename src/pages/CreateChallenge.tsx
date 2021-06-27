import React, { useState } from 'react';
import { useAuthHeader } from 'react-auth-kit';
import '../components/style.scss';
// import './CodeRunning.scss';

import Axios from '../axios-config';

// type Challenge = {
//   _id: string;
//   name: string;
//   instructions: string;
//   imageUrl: string;
// };

export const CreateChallenge = (props: {
  match: { params: { id: string } };
}) => {
  const [name, setName] = useState('');
  const [instructions, setInstructions] = useState('');
  // const [images, setImages] = useState([]);

  const getAuthToken = useAuthHeader();
  // const getUser = useAuthUser()

  const postChallenge = async () => {
    const params = new FormData();
    params.append('name', name);
    params.append('instructions', instructions);

    // images.forEach((image) => {
    //   params.append('pictures', image);
    // });

    Axios.post(`/challenges`, params, {
      headers: {
        Authorization: getAuthToken(),
        'content-type': 'multipart/form-data',
      },
    })
      .then(({ data: { content } }) => {
        console.log(content);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4 rounded m-5 p-10">
        <div className="col-span-2 bg-gray-600 rounded p-10">
          <h1>Create your own challenge</h1>
          <div className="form">
            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                className="text-black"
                type="text"
                name="name"
                placeholder="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Instructions</label>
              <input
                className="text-black"
                type="text"
                name="instructions"
                placeholder="instructions"
                onChange={(e) => setInstructions(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="h-auto text-center bg-gray-600 rounded p-5">
          <h2>Challenge</h2>
          <input className="browser" type="file" id="pattern" name="pattern" />
        </div>
        <div className="h-auto text-center rounded p-5">
          <h2>Pattern</h2>
          <input
            className="browser"
            type="file"
            id="pattern"
            name="pattern"
            accept="image/png, image/jpeg"
          />
        </div>
      </div>
      <div className="validate">
        <button className="arounded-bl-lg h-10 w-20 " onClick={postChallenge}>
          Save
        </button>
      </div>
    </>
  );
};
