import React from 'react';
// import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  // const navigate = useNavigate();

  // 카카오 소셜로그인 인가코드 따오는 부분
  // const params = new URL(document.location.toString()).searchParams;
  // const code = params.get('code');
  const handleClick = () => {
    alert('카카오 로그인');
  };

  return (
    <div className="Login">
      <div className="container">
        <div className="user">
          <div className="textbox">for 하루살이</div>
          <div className="text">
            <p>평소와는 다른,</p>
            <p>뭔가 특별한 하루를</p>
            <p>꿈꾸는 당신</p>
          </div>
          <div className="imgbox">
            <button onClick={handleClick}>
              <img
                src="/images/kakao_login_medium_narrow.png"
                alt="login_user"
              />
            </button>
          </div>
        </div>
        <div className="hline" />
        <div className="event">
          <div className="textbox">for 등대지기</div>
          <div className="text">
            <p>누군가의 새로운</p>
            <p>하루, 그 앞길에</p>
            <p>빛을 비춰줄 당신</p>
          </div>
          <div className="imgbox">
            <button onClick={handleClick}>
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
