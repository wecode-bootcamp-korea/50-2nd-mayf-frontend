import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import SignUp from './pages/SignUp/SignUp';
import Detail from './pages/Detail/Detail';
import Check from './pages/Check/Check';
import List from './pages/List/List';
import MyPageUser from './pages/MyPageUser/MyPageUser';
import MyPageEvent from './pages/MyPageEvent/MyPageEvent';
import Manage from './pages/Manage/Manage';
import Credit from './pages/Credit/Credit';
import EventProfile from './pages/EventProfile/EventProfile';
import ClassList from './pages/ClassList/ClassList';
import AddClass from './pages/AddClass/AddClass';
import EditClass from './pages/EditClass/EditClass';
import Schedule from './pages/Schedule/Schedule';
import ChatList from './pages/ChatList/ChatList';
import ChatRoom from './pages/ChatRoom/ChatRoom';
import Calculate from './pages/Calculate/Calculate';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/list" element={<List />} />
        <Route path="/check" element={<Check />} />
        <Route path="/my-page-user" element={<MyPageUser />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/credit" element={<Credit />} />
        <Route path="/my-page-event" element={<MyPageEvent />} />
        <Route path="/my-page-event-profile" element={<EventProfile />} />
        <Route path="/my-page-event-classlist" element={<ClassList />} />
        <Route path="/my-page-event-addclass" element={<AddClass />} />
        <Route path="/my-page-event-editclass" element={<EditClass />} />
        <Route path="/my-page-event-schedule" element={<Schedule />} />
        <Route path="/my-page-event-chatlist" element={<ChatList />} />
        <Route path="/my-page-event-chatroom" element={<ChatRoom />} />
        <Route path="/my-page-event-calculate" element={<Calculate />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
