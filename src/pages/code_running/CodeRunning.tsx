import React, { useState } from 'react';
import pattern from '../../assets/pattern.svg';
// import './CodeRunning.scss';

import Editor from '@monaco-editor/react';
import axios from 'axios';



export const CodeRunning = () => {
  const [code, setCode] = useState('');
  const [stdout, setStdout] = useState('');

  const runOnClick = async () => {
    const { data } = await axios.post('/attempts', { code });
    console.log(data);
  };

  return (
    <>
      <div className="min-h-screen py-6 flex flex-col justify-center">
        {/* <div className="navExercises">
          <nav>
            <ul>
              <li>Exercice 1</li>
              <li>Exercice 2</li>
            </ul>
          </nav>
        </div> */}

        <div className="grid grid-cols-2 gap-4 rounded m-5 p-10">
          <div className="bg-gray-600 rounded m-15 p-10 col-span-2">
            <p>Exercice</p>
            <p>...........</p>
          </div>
          <div className="rounded-lg max-h-full overflow-hidden">
            <div className="">
              <Editor
                defaultLanguage="bash"
                height="70vh"
                // defaultValue="// some comment"
                onChange={(value) => {
                  setCode(value as string);
                }}
                theme="vs-dark"
                
              />
            </div>
            <div className="h-20 grid grid-cols-12 justify-center overflow-hidden rounded-b">
              <span className="bg-black max-h-full h-full col-span-11 p-2">Sortie</span>
              <div className="bg-black col-span-1 flex justify-center items-center">
                <button className="bg-blue-500 px-2 rounded max-h-10" onClick={runOnClick}>Run</button>
              </div>
              
            </div>
          </div>

          <div className="h-auto text-center bg-gray-600 rounded p-5">
            <img className="h-full" alt="pattern" src={pattern} />
          </div>
        </div>
      </div>
    </>
  );
};
