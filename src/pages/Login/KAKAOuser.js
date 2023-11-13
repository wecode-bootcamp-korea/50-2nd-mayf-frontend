import React, { useEffect } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { useSearchParams } from 'react-router-dom';

const KAKAOuser = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    fetch('api address', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: code,
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
  return (
    <>
      <Spinner />
    </>
  );
};

export default KAKAOuser;
