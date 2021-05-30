import React from 'react';
import pattern from '../../assets/pattern.svg';
import './CodeRunning.scss';

import Editor from '@monaco-editor/react';

export const CodeRunning = () => {
  const runOnClick = () => {
    console.log('running');
  };

  return (
    <>
      <div className="body">
        <div className="navExercises">
          <nav>
            <ul>
              <li>Exercice 1</li>
              <li>Exercice 2</li>
            </ul>
          </nav>
        </div>
        <div className="consigne">
          <p>Exercice</p>
          <p>...........</p>
        </div>
        <div className="pattern">
          <img alt="pattern" src={pattern} />
        </div>
        <div className="monaco-editor">
          <Editor
            height="50vh"
            defaultLanguage="bash"
            // defaultValue="// some comment"
          />
        </div>
        <div className="sortie">
          <textarea className="sortieArea">Sortie</textarea>
        </div>
        <button onClick={() => runOnClick()}>Run</button>
      </div>
    </>
  );
};
