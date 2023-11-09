import React from 'react';
import './Login.scss';

const Login = () => {
  const REST_API_KEY = '90dbff4da803f007ab4c956bfce95fd0';

  const handleClickUser = () => {
    const REDIRECT_URI = 'http://localhost:3000/users/signin';
    const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code
  `;
    window.location.href = KAKAO_URL;
  };

  const handleClickEvent = () => {
    const REDIRECT_URI = 'http://localhost:3000/auth/kakao/callbackevent';
    const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code
  `;
    window.location.href = KAKAO_URL;
  };

  return (
    <div className="Login">
      <div className="container">
        <div className="user">
          <div className="textBox">for 하루살이</div>
          <div className="text">
            평소와는 다른,
            <br />
            뭔가 특별한 하루를
            <br />
            꿈꾸는 당신
          </div>
          <div className="imgBox">
            <button onClick={handleClickUser}>
              <img
                src="/images/kakao_login_medium_narrow.png"
                alt="login_user"
              />
            </button>
          </div>
        </div>
        <div className="hline" />
        <div className="event">
          <div className="textBox">for 등대지기</div>
          <div className="text">
            누군가의 새로운
            <br />
            하루, 그 앞길에
            <br />
            빛을 비춰줄 당신
          </div>
          <div className="imgBox">
            <button onClick={handleClickEvent}>
              <img
                src="/images/kakao_login_medium_narrow.png"
                alt="login_event"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
