import React from 'react';
import logo from "./PicSpyLogo.png"
import pattern from "./pattern.svg"
import "./CodeRunning.css"
import ReactDOM from "react-dom";

import Editor from "@monaco-editor/react";
import loader from "@monaco-editor/loader";


function runOnClick() {
  loader.init().then(monaco => {
    console.log('Here is the monaco instance', monaco);
  });
}
export class CodeRunning extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="App" ref={this.props.containerRef}>
        <div className="header">
          <div className="logo">
            <img src={logo} />
          </div>
          <div className="navMenu">
            <nav>
              <ul>
                <li><a href="#">Overview</a></li>
                <li><a href="#">Liste des exercices</a></li>
              </ul>
            </nav>
          </div>
        </div>

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
            <img src={pattern} />
          </div>
          <div className="editeur">
            <div className="monaco-editor">
              <Editor
                height="50vh"
                defaultLanguage="bash"
                theme="vs-dark"
              // defaultValue="// some comment"
              />
            </div>
            <div className="sortie">
              <textarea className="sortieArea">Sortie</textarea>
            </div>
            <button onClick={runOnClick()}>Run</button>
          </div>
        </div>
      </div>
    );
  }
}
