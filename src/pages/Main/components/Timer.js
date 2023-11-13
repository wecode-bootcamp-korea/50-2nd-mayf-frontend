import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ deadline }) => {
  const [secondsRemaining, setSecondsRemaining] = useState(
    calculateTimeRemaining(),
  );

  useEffect(() => {
    //setTitmeout;
    const timerInterval = setInterval(() => {
      setSecondsRemaining(calculateTimeRemaining());
    }, 1000);

    // 컴포넌트가 언마운트되면 타이머 클리어
    return () => clearInterval(timerInterval);
  }, [deadline]);

  function calculateTimeRemaining() {
    if (deadline) {
      const now = new Date();
      const deadlineDate = new Date(deadline);
      const timeDiff = deadlineDate - now;
      return Math.max(Math.floor(timeDiff / 1000), 0);
    }
    return 0;
  }

  return <>{secondsRemaining}</>;
};

export default CountdownTimer;
