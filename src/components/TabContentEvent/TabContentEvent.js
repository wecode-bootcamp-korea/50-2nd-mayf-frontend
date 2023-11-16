import React from 'react';
import EventProfile from '../EventProfile/EventProfile';
import ClassList from '../ClassList/ClassList';
import ClassChat from '../ClassChat/ClassChat';
import Calculate from '../Calculate/Calculate';
import AddClass from '../AddClass/AddClass';

const TabContentEvent = ({ tab, setTab }) => {
  if (tab === 0) {
    return <EventProfile />;
  } else if (tab === 1) {
    return <ClassList setTab={setTab} />;
  } else if (tab === 2) {
    return <ClassChat />;
  }
  // else if (tab === 3) {
  //   return <Calculate />;
  // }
  else if (tab === 4) {
    return <AddClass setTab={setTab} />;
  }
};

export default TabContentEvent;
