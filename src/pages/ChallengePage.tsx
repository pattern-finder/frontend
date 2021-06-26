import React, { useEffect, useState } from 'react';
// import './CodeRunning.scss';

import Editor from '@monaco-editor/react';
import Axios from '../axios-config';
import { useAuthHeader } from 'react-auth-kit';

type Challenge = {
  _id: string;
  name: string;
  instructions: string;
  imageUrl: string;
};

export const ChallengePage = (props: { match: { params: { id: string } } }) => {
  const [challenge, setChallenge] = useState({} as Challenge);
  const [code, setCode] = useState('');
  const [stdout, setStdout] = useState('STDOUT');

  const authHeader = useAuthHeader();

  useEffect(() => {
    const fetchChallenge = async (id: string) => {
      const {
        data: { content },
      } = await Axios.get(`/challenges/${id}`, {
        headers: { Authorization: authHeader() },
      });
      setChallenge(content);
    };

    fetchChallenge(props.match.params.id);
  }, [props.match.params.id, authHeader]);

  const runOnClick = async () => {
    const { data } = await Axios.post(
      `/attempts`,
      {
        challenge: challenge._id.split('/').pop(),
        code,
        language: 'bash',
      },
      {
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkhlbG9pc2UiLCJzdWIiOiI2MGE5MTE1MzA3NmQ0OGVjMTljN2MxYjgiLCJpYXQiOjE2MjMwNjExNjJ9.EpDB71Kd2HmjrSr57Oace5r7efolXK-9Ffiv-lmnmoI',
        },
      },
    );
    setStdout(data.stdout);
    console.log(data);
  };

  return (
    <>
      <div className="min-h-screen py-6 flex flex-col justify-center">
        <div className="grid grid-cols-2 gap-4 rounded m-5 p-10">
          <div className="bg-gray-600 rounded m-15 p-10 col-span-2">
            <div className="font-bold text-xl mb-2">{challenge.name}</div>
            <p>{challenge.instructions}</p>
          </div>
          {/* <div className="h-auto text-center bg-gray-600 rounded p-5"> */}
          <div className="rounded-lg h-full overflow-hidden flex flex-col justify-center items-center">
            <div className="relative max-h-full w-full">
              <Editor
                defaultLanguage="bash"
                height="80vh"
                // defaultValue="// some comment"
                onChange={(value) => {
                  setCode(value as string);
                }}
                theme="vs-dark"
              />

              <button
                className="absolute top-0 right-0 bg-blue-500 px-2 rounded-bl-lg h-10 w-20 "
                onClick={runOnClick}
              >
                Run
              </button>
            </div>
            <div className="h-full w-full overflow-hidden rounded-b">
              <div className="bg-black max-h-full h-full p-2 w-full text-left font-light">
                {stdout || "Aucune sortie après l'execution de ce code."}
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="h-auto text-center bg-gray-600 rounded p-5">
            <img
              className="h-full max-h-full object-contain"
              alt="pattern"
              src={challenge.imageUrl}
            />
          </div>
        </div>
      </div>
    </>
  );
};
