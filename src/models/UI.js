import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Layout, Menu, message, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';
import { addToCart } from '../cartHandling/actions';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;


const FrontPage = ({categoryID}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [filteredData, setFilteredData] = useState([]);


    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    function handleAddToCart(product) {
        dispatch(addToCart(product));
    }


    const columns = [
  
        {
          title: 'index',
          width: 100,
          dataIndex: 'product_item_id',
          key: 'product_item_id',
          fixed: 'left',
        },
        {
          title: 'title',
          width: 200,
          dataIndex: 'product_name',
          key: 'title',
          fixed: 'left',
        },
        {
          title: 'Availablility',
          width: 100,
          dataIndex: 'quantity',
          key: '1',
          render: (text) => {
            if (text > 0) {
              return <span style={{color: 'green'}}>In Stock</span>
            } else {
              return <span style={{color: 'red'}}>Out of Stock</span>
            }
          }
        },
        {
          title: 'Price',
          width: 100,
          dataIndex: 'price',
          key: '2',
        },
        {
          title: 'Add to Cart',
          key: 'operation',
          fixed: 'right',
          width: 150,
          render: (text, record) => (
          <a onClick={() => handleAddToCart({product_item_id: record.product_item_id, name: record.product_name, price: record.price, quantity: 1})}>Add</a>
          ),
        },
      ];  
    
    const getFilteredData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/ui/' + categoryID);
            setFilteredData(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getFilteredData();
    }, [categoryID]);

    useEffect(() =>{
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

      useEffect(() => {
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/ui/0');
            setFilteredData(response.data);
          } catch (e) {
            console.log(e);
          }
        };
        fetchProducts();
      }, [categoryID]);

    const handleMenuClick = async(event) => {
        if (event.key === 'Show All') {
            setSelectedCategory(null);
        }
        else {
            setSelectedCategory(event.key);
        }

        try {
            const response = await axios.get('http://localhost:8080/api/ui/' + event.key);
            setFilteredData(response.data);
        } catch (e) {
            console.log(e);
        }

    };


    const handleSignOut = async() => {
        try {
            const response = await axios.get('http://localhost:8080/api/auth/signout');
            if (response.data.message === 'Success') {
                message.success('Sign out successfully');
                Cookies.remove('user');
                Cookies.remove('token');
            }
            else if (response.data.message === 'No session') {
                message.error('You are not signed in');
            } 
          }catch (e) {
                message.error('Sign out failed');
            }
    };

    return (
        <>
        <Title level={2} style={{textAlign: 'center',  color: '#fff', backgroundColor: '#00bfff'}}>
            Budget MART
        </Title>
        <Layout>
        <Header>
            <Link to="/SignIn">
                <Button>Sign In</Button>
            </Link>
            <Link to="/SignUp">
                <Button>Sign Up</Button>
            </Link>
            <Link to="/Cart">
                <Button>Cart</Button>
            </Link>
            <Link to="/Reports">
                <Button>Reports</Button>
            </Link>
            <Button onClick={handleSignOut}>Sign Out</Button>
        </Header>
        <Layout>
            <Sider>
            <Menu onClick={handleMenuClick}>
                <Menu.Item key={0}>Show All</Menu.Item>
                {categories.map((category) => (
                    <Menu.Item key={category.ID}>{category.category_name}</Menu.Item>
                ))}
            </Menu>
            </Sider>
            <Content>
            <Table columns={columns} dataSource={filteredData} />
            </Content>
        </Layout>
        </Layout>
        </>
    );
};


export default FrontPage;




