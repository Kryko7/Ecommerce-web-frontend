import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import SignIn from './models/SignIn';
import SignUp from './models/SignUp';
import UIjs from './components/UIjs';


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UIjs />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;