import React from 'react';
import pattern from "../../assets/pattern.svg"
import "./CodeRunning.scss"
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";
import loader from "@monaco-editor/loader";


export const CodeRunning = () => {

  const runOnClick = () => {
    console.log("running");
  }

  return (
    <>
      <div className="body">
        <div className="navExercises">
          <nav>
            <ul>
              <li><a href="#">Exercice 1</a></li>
              <li><a href="#">Exercice 2</a></li>
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

}
