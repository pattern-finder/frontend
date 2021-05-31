import React from 'react';
import pattern from '../../assets/pattern.svg';
// import './CodeRunning.scss';

import Editor from '@monaco-editor/react';

export const CodeRunning = () => {
  const runOnClick = () => {
    console.log('running');
  };

  return (
    <>
      <div className="min-h-screen bg-gray-800 py-6 flex flex-col justify-center sm:py-12">
        {/* <div className="navExercises">
          <nav>
            <ul>
              <li>Exercice 1</li>
              <li>Exercice 2</li>
            </ul>
          </nav>
        </div> */}
        <div className="grid grid-cols-3 gap-4">
          <div className="consigne">
            <p>Exercice</p>
            <p>...........</p>
          </div>

          <div className="monaco-editor">
            <Editor
              height="50vh"
              defaultLanguage="bash"
              // defaultValue="// some comment"
            />
            <div className="sortie">
              <textarea className="sortieArea">Sortie</textarea>
              <button onClick={() => runOnClick()}>Run</button>
            </div>
          </div>
          <div className="pattern">
            <img alt="pattern" src={pattern} />
          </div>
        </div>
      </div>
    </>
  );
};
