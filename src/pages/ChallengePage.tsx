import React, { useEffect, useState } from 'react';
// import './CodeRunning.scss';

import Editor from '@monaco-editor/react';
import Axios from '../axios-config';

type Challenge = {
  name: string;
  instructions: string;
  imageUrl: string;
};

export const ChallengePage = (props: { match: { params: { id: string } } }) => {
  const [challenge, setChallenge] = useState({} as Challenge);
  const [code, setCode] = useState('');
  // const [stdout, setStdout] = useState('');

  useEffect(() => {
    const fetchChallenge = async (id: string) => {
      const {
        data: { content },
      } = await Axios.get(`/challenges/${id}`);
      setChallenge(content);
    };

    fetchChallenge(props.match.params.id);
  }, [props.match.params.id]);

  const runOnClick = async () => {
    const { data } = await Axios.post(`/attempts`, {
      code,
    });
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
          <div className="h-auto text-center bg-gray-600 rounded p-5">
            <div className="rounded-lg max-h-full overflow-hidden flex flex-col justify-center items-center">
              <div className="max-h-full w-full">
                <Editor
                  defaultLanguage="bash"
                  height="90vh"
                  // defaultValue="// some comment"
                  onChange={(value) => {
                    setCode(value as string);
                  }}
                  theme="vs-dark"
                />
              </div>
              <div className="h-auto w-full grid grid-cols-12 justify-center overflow-hidden rounded-b">
                <div className="bg-black max-h-full h-full col-span-11 p-2 text-left font-light">
                  Sortie
                </div>
                <div className="bg-black col-span-1 flex justify-center items-center">
                  <button
                    className="bg-blue-500 px-2 rounded max-h-10"
                    onClick={runOnClick}
                  >
                    Run
                  </button>
                </div>
              </div>
            </div>
          </div>
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
