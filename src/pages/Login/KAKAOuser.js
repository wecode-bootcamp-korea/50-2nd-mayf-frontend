import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';

const KAKAOuser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const code = searchParams.get('code');

  useEffect(() => {
    fetch('http://10.58.52.144:8000/users/signup', {
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
          navigate('/');
        } else {
          alert('error');
        }
      });
  });

  return <Spinner />;
};

export default KAKAOuser;
