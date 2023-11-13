import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const KAKAOevent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');
  const accessToken = '';

  useEffect(() => {
    fetch(`https://kauth.kakao.com/oauth/token`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      body: `grant_type=authorization_code&client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=http://localhost:3000/hosts/signup&code=${code}`,
    })
      .then((res) => res.json())
      .then((data) => {
        postToken(data.access_token);
      });
  });

  const postToken = (token) => {
    fetch('http://10.58.52.190:8000/hosts/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'login_success') {
          localStorage.setItem('token', data.accessToken);
          navigate('/');
        } else {
          alert('로그인에 실패했습니다');
        }
      });
  };

  return <Spinner />;
};

export default KAKAOevent;
