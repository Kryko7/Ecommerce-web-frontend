import React from 'react';
import { Tabs, message, Typography } from 'antd';
import SalesReport from './SalesReport';
import ProductInterestReport from './ProductInterestReport';
import CustomerOrderReport from './CustomerReport';
import CategoriesReport from './CategoriesReport';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import DateForm from './ProductsReport';

import { useEffect, useState } from 'react';


const { TabPane } = Tabs;
const { Title } = Typography;




function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();


  useEffect(() => {
    const checkToken = async () => {
      const token = Cookies.get('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:8080/api/auth/verify-token', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        if(data.success) {
          setIsAuthenticated(true);
          setIsAdmin(data.isAdmin);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    }
    checkToken();
  }, [isAdmin]);

  if (isLoading) {
    return <div>Loading...</div>
  }


  if (!isAdmin) {
    message.error('You are not authorized to view this page');
    // return (
    //   <Link to="/">Home</Link>
    // )
    navigate('/');
    return null;
  }
  else {
    return (
      <div>
        <Title level={2} style={{ textAlign: 'center', color: '#fff', backgroundColor: '#00bfff' }}>
          Reports
        </Title>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Sales Report" key="1">
            <SalesReport />
          </TabPane>
          <TabPane tab="Products Report" key="2">
            <DateForm />
          </TabPane>
          <TabPane tab="Categories Report" key="3">
            <CategoriesReport />
          </TabPane>
          <TabPane tab="Product Interest Report" key="4">
            <ProductInterestReport />
          </TabPane>
          <TabPane tab="Customer Order Report" key="5">
            <CustomerOrderReport />
          </TabPane>
          <TabPane tab={<button onClick={() => navigate('/')}>Home</button>} key="6" style={{ position: 'absolute', right: 0 }}>
          </TabPane>

        </Tabs>
      </div>
    );
  }
}

export default Dashboard;
