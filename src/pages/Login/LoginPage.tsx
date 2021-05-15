import { useState } from "react";
import { LoginForm } from "../../components/login/LoginForm";
import { Register } from "../../components/login/Register";
import "./Login.scss"

export const LoginPage = () => {
  const [loggingIn, setLoggingIn] = useState(false);

  const changeState = () => {
    const currentLoggingInState = loggingIn;
    setLoggingIn(!currentLoggingInState);
  }


  return (
    <div className="login">
      <div className="container" >
        { 
          loggingIn ? <LoginForm/> : <Register/>
        }
      </div>
      <div
        className="right-side"
      >
        <div className="inner-container">
          <div className="text">
            { loggingIn ? "Login" : "Register" }
          </div>
        </div>
      </div>
    </div>
  );

}