import React, { useEffect } from 'react';

const KAKAOuser = () => {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');

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
    <div>
      <div>user 로딩중입니다...</div>
      <div>{code}</div>
    </div>
  );
};

export default KAKAOuser;
