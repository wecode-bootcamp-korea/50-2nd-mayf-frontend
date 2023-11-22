import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const KAKAOevent = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');

  useEffect(() => {
    fetch('http://34.64.172.211:8000/hosts/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        code,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'LOGIN_SUCCESS') {
          localStorage.setItem('token', data.jwtToken);
          localStorage.setItem('role', data.role);
          navigate('/');
        } else {
          if (data.message === 'CODE ERROR') {
            alert('로그인 과정에서 오류가 발생했습니다');
          } else {
            alert('서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요');
          }
        }
      });
  });

  return <Spinner />;
};

export default KAKAOevent;
