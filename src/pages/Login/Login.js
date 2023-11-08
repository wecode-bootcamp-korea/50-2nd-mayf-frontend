import React from 'react';
import './Login.scss';

const Login = () => {
  return (
    <div className="Login">
      <div className="container">
        <div className="user">
          <button className="loginBtn">하루살이</button>
        </div>
        <div className="event">
          <button className="loginBtn">등대지기</button>
        </div>
        <div className="signup">
          <p>회원가입</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
