import React from 'react';
import welcome from '../assets/welcome.png';
import stats from '../assets/stats.png';
import create from '../assets/create.png';
import challenge from '../assets/challenge.png';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
// import './Navbar.css';

export const Slider = () => {
  return (
    <div className="w-2/5 pt-20 m-auto">
      <Slide>
        <img src={welcome} alt="slide" />
        <img src={challenge} alt="slide" />
        <img src={stats} alt="slide" />
        <img src={create} alt="slide" />
      </Slide>
    </div>
  );
};
