import React from 'react';
import Profile from '../Profile/Profile';
import Reservation from '../Reservation/Reservation';
import WishList from '../WishList/WishList';
import Credit from '../Credit/Credit';

const TabContent = ({ tab }) => {
  if (tab === 0) {
    return <Profile />;
  } else if (tab === 1) {
    return <Reservation />;
  } else if (tab === 2) {
    return <WishList />;
  } else if (tab === 3) {
    return <Credit />;
  }
};

export default TabContent;
