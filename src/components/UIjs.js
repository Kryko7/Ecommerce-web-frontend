import React from 'react';
import { ShoppingOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { MenuProps } from "antd";
import { useState } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ProductTable from './table';
import axios from 'axios';

const { Header, Content, Sider } = Layout;

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080',
// })



const items1 = ['SignIn', 'SignUp', 'Cart', 'Reports'].map((key) => ({
  key,
  label: `${key}`,
  to: `/${key}`,
}));


// const handleMenuItemClick = (key) => {
  
//   axios.get(`/api/ui/${key}`)
//     .then((response) => {
//       // Process the data here
//       setCategoryID(key);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };



// const items3 = [ShoppingOutlined].map((icon, index) => {
//   const key = String(index + 1);
//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,
//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//         onclick: () => handleMenuItemClick(subKey),
//       };
//     }),
//   };
// });
const UIjs = () => {
  
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null)
  const [categoryID, setCategoryID] = useState(0);
  const [loadning, setLoading] = useState(true);


  React.useEffect(() =>{
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/ui/categories');
        setCategories(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchCategories();
  }, []);

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


  const handleMenuItemClick = (key) => {
    setActiveCategory(key);
  };


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
          onclick: () => handleMenuItemClick(subKey),
        };
      }),
    };
  });






  // React.useEffect(() => {fetch('http://localhost:8080/api/ui/categories', {method: 'GET'}).then(res => res.json()).then(res =>  setCategories(res)) }, []);
  


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
            <ProductTable categoryID={setActiveCategory} />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default UIjs;