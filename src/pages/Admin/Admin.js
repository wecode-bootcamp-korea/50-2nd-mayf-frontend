import React, { useState } from 'react';
import ClassList from './components/ClassList';
import HostList from './components/HostList';
import UserList from './components/UserList';
import Adjustment from './components/Adjustment';
import './Admin.scss';

const Admin = () => {
  const ADMIN_TAB_LIST = [
    { id: 1, btnText: '하루살이 목록 조회', component: <UserList /> },
    {
      id: 2,
      btnText: '등대지기 목록 조회',
      component: <HostList />,
    },
    {
      id: 3,
      btnText: '클래스 목록 조회',
      component: <ClassList />,
    },
    {
      id: 4,
      btnText: '정산 관련 페이지',
      component: <Adjustment />,
    },
  ];
  const userRole = localStorage.getItem('role');
  const [categoryId, setCategoryId] = useState(ADMIN_TAB_LIST[0].id);

  return userRole === 'admin' ? (
    <div className="Admin">
      <div className="category">
        {ADMIN_TAB_LIST.map(({ id, btnText }) => (
          <button key={id} onClick={() => setCategoryId(id)}>
            {btnText}
          </button>
        ))}
      </div>
      <div className="container">
        {ADMIN_TAB_LIST.find(({ id }) => id === categoryId).component}
      </div>
    </div>
  ) : null;
};

export default Admin;
