import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';
import './Login.scss';

export const LoginPage = () => {
  const [loggingIn, setLoggingIn] = useState(false);

  const switchState = () => {
    const currentLoggingInState = loggingIn;
    setLoggingIn(!currentLoggingInState);
  };

  return (
    <div className="login">
      <div className="container">
        {loggingIn ? <LoginForm /> : <RegisterForm />}
      </div>
      <div className={`switch-button ${loggingIn ? 'right' : 'left'}`}>
        <div className="inner-container" onClick={switchState}>
          <div className="text">{loggingIn ? 'Register' : 'Login'}</div>
        </div>
      </div>
    </div>
  );
};
