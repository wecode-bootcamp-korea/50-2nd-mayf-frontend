import React from 'react';
import Spinner from '../../components/Spinner/Spinner';

const KAKAOevent = () => {
  const params = new URL(document.location.toString()).searchParams;
  const code = params.get('code');
  return (
    <div>
      <Spinner />
    </div>
  );
};

export default KAKAOevent;
