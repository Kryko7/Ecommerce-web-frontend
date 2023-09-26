import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from 'antd';

import CartX from './cartHandling/cartPage';
import { Provider } from 'react-redux/es/exports';
import store from './cartHandling/store';
import Dashboard from './components/ReportDashboard';
import CheckoutPage from './models/CheckoutTest';
import FrontPage from './models/UI';
import SignIn from './models/SignInAntd';
import SignUp from './models/SignUpAntd';
import DeliveryForm from './models/CheckoutForm';
// import VA from './models/ProductView';
//http://locaasdasd.dasd/SingnIN
function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        {/* <Route path="/view" element = {<Provider store={store}> <div> <VA /> </div> </Provider> } /> */}
        <Route path="/cart" element={<Provider store={store}> <div> <CartX /> </div> </Provider> } />
        <Route path="/Reports" element={<Dashboard />} />
        <Route path="/testing" element = { <CheckoutPage />} />
        <Route path="/" element = {<Provider store={store}> <div> <FrontPage /> </div> </Provider> } />
        <Route path="/delivery" element = { <DeliveryForm /> } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;