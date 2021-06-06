import React, { Component } from 'react';
import pattern from "../../assets/pattern.svg"
import ReactDOM from "react-dom";
import { useState } from 'react';
import {Redirect} from 'react-router-dom';


export const Home = () => {

  const [loggingIn, setLoggingIn] = useState(false);

  const switchState = () => {
    const currentLoggingInState = loggingIn;
    setLoggingIn(!currentLoggingInState);
  };

  if (loggingIn) {
    return <p> Bienvenue tu es bien connecté à PicSpy </p>
  } else {
    return <Redirect to="/login" push/>
  }

}
