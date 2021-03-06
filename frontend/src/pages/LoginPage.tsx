import { useState } from 'react';
import { LoginForm } from '../components/LoginForm';
import { RegisterForm } from '../components/RegisterForm';

export const LoginPage = () => {
  const [loggingIn, setLoggingIn] = useState(true);

  const switchState = () => {
    const currentLoggingInState = loggingIn;
    setLoggingIn(!currentLoggingInState);
  };

  return (
    <div className="grid justify-items-center p-10">
      <div className="bg-pink-900 rounded h-min px-16 py-6 transition-all relative">
        <button
          className={`absolute top-0 bg-black h-10 w-20 ${
            loggingIn
              ? ' rounded-br-lg  rounded-tl left-0 '
              : ' rounded-bl-lg  rounded-tr right-0 '
          } `}
          onClick={switchState}
        >
          {loggingIn ? 'Register' : 'Login'}
        </button>
        {loggingIn ? <LoginForm /> : <RegisterForm />}
      </div>
    </div>
  );
};
