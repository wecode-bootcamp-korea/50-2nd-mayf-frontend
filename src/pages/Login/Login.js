import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();

  // 카카오 소셜로그인 인가코드 따오는 부분
  // const params = new URL(document.location.toString()).searchParams;
  // const code = params.get('code');

  return (
    <div className="Login">
      <div className="container">
        <div className="user">
          <div className="textbox">for 하루살이</div>
          <img src="/images/kakao_login_medium_narrow.png" alt="login_user" />
        </div>
        <div className="event">
          <div className="textbox">for 등대지기</div>
          <img src="/images/kakao_login_medium_narrow.png" alt="login_event" />
        </div>
        <div className="signup">
          <span>아직 회원이 아니시라면 </span>
          <span className="link" onClick={() => navigate('/sign-up')}>
            회원가입
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
