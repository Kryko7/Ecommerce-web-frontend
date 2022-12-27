import React from 'react';
import { Tabs } from 'antd';
import SalesReport from './SalesReport';
import ProductsReport from './ProductsReport';
import CategoriesReport from './CategoriesReport';
import ProductInterestReport from './ProductInterestReport';
import CustomerOrderReport from './CustomerReport';
import { Link } from 'react-router-dom';

const { TabPane } = Tabs;

class Dashboard extends React.Component {
  render() {
    return (
    <div>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Sales Report" key="1">
          <SalesReport />
        </TabPane>
        <TabPane tab="Products Report" key="2">
          <ProductsReport />
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