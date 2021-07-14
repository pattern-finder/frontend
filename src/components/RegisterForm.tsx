import React from 'react';
import loginImg from '../assets/login.svg';
import { useState } from 'react';
import Axios from '../axios-config';
import toast from 'react-hot-toast';

export const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function createUser() {
    const toastId = toast.loading('Creating user...');
    Axios.post('/users', { username, email, password })
      .then(({ data }) => {
        toast.success('User created !', { id: toastId });
        window.location.reload();
      })
      .catch(
        ({
          response: {
            data: { message },
          },
        }) => {
          toast.error(`Could not register: ${message}`, { id: toastId });
        },
      );
  }

  return (
    <div className="base-container">
      <div className="header">Register</div>
      <div className="content">
        <div className="image">
          <img alt="login" src={loginImg} />
        </div>
        <div className="form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              className="text-black"
              type="text"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              className="text-black"
              type="text"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              className="text-black"
              type="password"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="footer">
        <button
          type="button"
          className="bg-blue-500 rounded-lg px-6 py-2"
          onClick={(_) => createUser()}
        >
          Register
        </button>
      </div>
    </div>
  );
};
