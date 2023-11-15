import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EventUser.scss';

const EventUser = () => {
  const navigate = useNavigate();
  return (
    <div className="evenUser">
      <ul className="eventUserMenu">
        <li
          className="menu"
          onClick={() => {
            navigate('/my-page-event');
          }}
        >
          MY PAGE
        </li>
      </ul>
    </div>
  );
};

export default EventUser;
