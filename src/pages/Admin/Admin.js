import React, { useState } from 'react';
import ClassList from './components/ClassList';
import HostList from './components/HostList';
import UserList from './components/UserList';
import Adjustment from './components/Adjustment';
import './Admin.scss';

//관리자가 로그인하면 들어오게 될 페이지.
//구현목표
//1. 초기화면으로 각종 요약 정보가 보이도록(하루 숫자 / 등대 숫자 / 누적 개설된 클래스 숫자 / 누적된 매출액 등)
//2. 유저 관리 탭 - 하루/등대의 목록과 해당 유저의 상태(크레딧 보유량이라던지 기타 등등 정보) 확인, 유저 삭제 기능 구현 예정
//3. 클래스 관리 탭 - 진행중/종료된 클래스의 목록과 클래스 정보 확인, 클래스 삭제 기능 구현 예정
//4. 카테고리 관련 기능은 넣지 않기로 결정함
//5. 정산 관리 탭 - 수수료율 관리, 현재 정산 대기중인 크레딧 내역, 누적된 정산 내역 확인 등 구현 예정
//6. 통계 탭 - 초기화면에 나오는 내용에 추가해서 디테일한 통계를 그래프 등으로 확인 가능하게 구현하면 좋을듯(단 가장 마지막 순서로)

const Admin = () => {
  // const token = localStorage.getItem('token');
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

  const [categoryId, setCategoryId] = useState(ADMIN_TAB_LIST[0].id);

  return (
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
  );
};

export default Admin;
