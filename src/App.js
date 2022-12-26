import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
import SignIn from './models/SignIn';
import SignUp from './models/SignUp';
import UIjs from './components/UIjs';
import CartPage from './components/cart';
import Cart from './models/dummyCart';
import Cart2 from './models/dummyCart2';
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<UIjs />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/cart" element={<Cart2 />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;