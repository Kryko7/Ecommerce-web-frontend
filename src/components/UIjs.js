import React from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { MenuProps } from "antd";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProductTable from './table';

const { Header, Content, Sider } = Layout;


const items1 = ['SignIn', 'SignUp', 'Cart', 'Reports'].map((key) => ({
  key,
  label: `${key}`,
  to: `/${key}`,
}));


const items3 = [ShoppingOutlined].map((icon, index) => {
  const key = String(index + 1);
  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,
    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});
const UIjs = () => {
  
  const [categories, setCategories] = useState([]);
  const [loadning, setLoading] = useState(true);

  React.useEffect(() => {fetch('http://localhost:8080/categories', {method: 'GET'}).then(res => res.json()).then(res =>  setCategories(res)) }, []);

  const {
    token: { colorBgContainer },
  } = theme.useToken();


  const items2 = [ShoppingOutlined].map((icon, index) => {
    const key = String(3);

    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `categories`,

      children: categories.map((category) => ({key : category.ID, label: category.category_name, }))
    };
  });


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
            {items1.map(({ key, label, to }) => (
              <Menu.Item key={key}>
                <Link to={to}>{label}</Link>
              </Menu.Item>
            ))}
          </Menu>
      </Header>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{
              height: '100%',
              borderRight: 0,
            }}
            items={items2}
          />
        </Sider>
        <Layout
          style={{
            padding: '0 24px 24px',
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>Products</Breadcrumb.Item>
            {/* <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item> */}
          </Breadcrumb>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <ProductTable />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default UIjs;