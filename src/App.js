import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';
//import SignIn from './models/SignIn';
//import SignUp from './models/SignUp';
import UIjs from './components/UIjs';
import CartX from './cartHandling/cartPage';
import { Provider } from 'react-redux/es/exports';
import store from './cartHandling/store';
import Dashboard from './components/ReportDashboard';
import Checkout from './models/Checkout';
import CheckoutPage from './models/CheckoutTest';
import FrontPage from './models/UI';
import SignIn from './models/SignInAntd';
import SignUp from './models/SignUpAntd';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/frontpage" element={<Provider store={store}> <div> <UIjs /> </div> </Provider>  }/>
        {/* <Route path="/SignIn" element={<SignIn />} /> */}
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/cart" element={<Provider store={store}> <div> <CartX /> </div> </Provider> } />
        <Route path="/Reports" element={<Dashboard />} />
        <Route path="/checkout" element={ <Checkout /> } />
        <Route path="/testing" element = { <CheckoutPage />} />
        <Route path="/" element = {<Provider store={store}> <div> <FrontPage /> </div> </Provider> } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;