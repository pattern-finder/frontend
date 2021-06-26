import React from 'react';
import './style.scss';
import loginImg from '../assets/login.svg';
import { useSignIn } from 'react-auth-kit';
import { useState } from 'react';
import Axios from '../axios-config';
import toast from 'react-hot-toast';

export const LoginForm = () => {
  // const signIn = useSignIn();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login() {
    Axios.post('/auth/login', { username, password })
      .then(
        ({
          data: {
            content: { access_token },
          },
        }) => {
          const tokenObject = JSON.parse(atob(access_token));
          console.log(tokenObject);
          toast.success('Logged in successfuly !');
        },
      )
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          toast.error(`Could not login: ${message}`);
        },
      );
  }

  return (
    <div className="base-container">
      <div className="header">Login</div>
      <div className="content">
        <div className="image">
          <img alt="Login" src={loginImg} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="text-black"
              type="text"
              name="username"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="text-black"
              type="password"
              name="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          onClick={(e) => login()}
          type="button"
          className="bg-blue-500 rounded-lg px-6 py-2"
        >
          Login
        </button>
      </div>
    </div>
  );
};
