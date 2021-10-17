import React from 'react';
import { Link } from 'react-router-dom';
import picspyLogo from '../assets/PicSpyLogoGrand.png';
import { Slider } from '../components/Slide';

function HeroSection() {
  return (
    <div className="relative z-10">
      <Slider />
      <Link to={`/tuto`}>
        <button className="rounded-lg overflow-hidden grid grid-cols-1 gap-1 w-2/6 m-auto text-3xl pt-5">
          Click here for the tutorial
        </button>
      </Link>
    </div>
  );
}

export default HeroSection;
