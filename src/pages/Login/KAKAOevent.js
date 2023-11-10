import React from 'react';

const KAKAOevent = () => {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');
  return (
    <div>
      <div>로딩중입니다...</div>
      <div>{code}</div>
    </div>
  );
};

export default KAKAOevent;
