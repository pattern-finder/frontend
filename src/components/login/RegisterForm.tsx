import React from 'react';
import './style.scss';
import loginImg from '../../login.svg';

export const RegisterForm = () => {
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
            <input type="text" name="username" placeholder="username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" placeholder="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="text" name="password" placeholder="password" />
          </div>
        </div>
      </div>
      <div className="footer">
        <button type="button" className="btn">
          Register
        </button>
      </div>
    </div>
  );
};