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

const { TabPane } = Tabs;
const { Title } = Typography;

class Dashboard extends React.Component {
  state = {
    isAuthenticated: false,
    isAdmin: false,
  };

  componentDidMount() {
    const token = Cookies.get('auth_token');
    if (!token) {
      return;
    }
    axios.get('http://localhost:8080/api/auth/verify-token', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(response => {
        const data = response.data;
        if(data.success) {
          this.setState({
            isAuthenticated: true,
            isAdmin: data.isAdmin,
          });
      }
      return data;

      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    if (!this.state.isAdmin) {
      message.error('You are not authorized to view this page');
      return (
        <Link to="/">Home</Link>
      )
    }

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
        <TabPane tab={<Link to="/">Home</Link>} key="6" style={{ position: 'absolute', right: 0 }}>
            <Link to="/">Home</Link>
        </TabPane>
      </Tabs>
    </div>
    );
  }
}

export default Dashboard;