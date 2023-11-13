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
const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/list" element={<List />} />
        <Route path="/check" element={<Check />} />
        <Route path="/my-page-user" element={<MyPageUser />} />
        <Route path="/my-page-event" element={<MyPageEvent />} />
        <Route path="/manage" element={<Manage />} />
        <Route path="/credit" element={<Credit />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
