import React from 'react';
import { useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { Link } from 'react-router-dom';
import picspyLogo from '../assets/PicSpyLogo.png';
// import './Navbar.css';

function Navbar() {
  const signOut = useSignOut();
  const isAuth = useIsAuthenticated();

  return (
    <nav className="t-4 max-h-16 h-16  bg-gray-900 grid grid-cols-10 gap-4 overflow-hidden shadow-sm border-b-2 border-gray-600">
      <Link
        to="/"
        className="col-span-6 text-left  max-h-full font-sans text-3xl flex flex-row"
      >
        <img
          src={picspyLogo}
          className="max-h-full h-16 object-contain"
          alt="logo"
        />
        <span className="my-auto flex content-center">PicSpy</span>
      </Link>

      <div className="flex flex-row w-full max-h-full m-auto col-span-4 text-lg ">
        <div className="m-auto">
          {/* This is a test route and it will be replaced with real ones when the site is done  */}
          <Link to="/challenges/609bef12c32facdd3fdc66e4" className="nav-links">
            <i className="fas fa-hard-hat pr-2" />
            Test
          </Link>
        </div>

        <div className="m-auto">
          <Link to="/About" className="nav-links">
            <i className="fas fa-info pr-2" />
            About
          </Link>
        </div>

        {isAuth() ? (
          <div className="m-auto">
            <Link to="/" className="" onClick={(_) => signOut()}>
              <i className="fas fa-sign-out-alt pr-2" />
              Sign out
            </Link>
          </div>
        ) : (
          <div className="m-auto">
            <Link to="/sign-up" className="nav-links">
              <i className="fas fa-sign-in-alt pr-2" />
              Login or register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
