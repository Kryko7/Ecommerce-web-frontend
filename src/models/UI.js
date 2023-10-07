import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Layout, Menu, message, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';
import { addToCart } from '../cartHandling/actions';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;


const FrontPage = ({categoryID}) => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const navigate = useNavigate();

    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    function handleAddToCart(product) {
        dispatch(addToCart(product));
    }


    const columns = [
  
        {
          title: 'Product ID',
          width: 100,
          dataIndex: 'product_item_id',
          key: 'product_item_id',
          fixed: 'left',
        },
        {
          title: 'Name',
          width: 200,
          dataIndex: 'product_name',
          key: 'title',
          fixed: 'left',
        },
        {
          title: 'Description',
          dataIndex: 'description'
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
            Cookies.get('user') != null ? 
              <a onClick={() => handleAddToCart({product_item_id: record.product_item_id, name: record.product_name, price: record.price, quantity: 1})}>Add</a>
            
            :
              <a onClick= {() => message.error('Please sign in to add to cart')}>Add</a>
            
          // <a onClick={() => 
          //   if(Cookies.get('user') != null) {
          //     handleAddToCart({product_item_id: record.product_item_id, name: record.product_name, price: record.price, quantity: 1})}>Add</a>
          //   }
          //   else {

          // <a onClick={() => {
          //   handleAddToCart({product_item_id: record.product_item_id, name: record.product_name, price: record.price, quantity: 1});
          //   // if(Cookies.get('temp_cart_item') != null) {
          //   //   Cookies.remove('temp_cart_item');
          //   // }
          //   // const cookieValue = {
          //   //   product_item_id: record.product_item_id,
          //   //   name: record.product_name,
          //   //   price: record.price,
          //   //   quantity: 1,
          //   //   category_id: record.category_id
          //   // };
          //   Cookies.set('temp_cart_item', JSON.stringify(cookieValue));
          //   //Cookies.set('temp_cart_item', {product_item_id: record.product_item_id, name: record.product_name, price: record.price, quantity: 1, category_id: record.category_id});
          //   // navigate('/view');
          // }}>Add</a>
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
      }, [categoryID]);

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
      }, []);

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
            if (response.data.message === 'Success' && Cookies.get('user') != null) {
                message.success('Sign out successfully');
                Cookies.remove('user');
                Cookies.remove('auth_token');
                Cookies.remove('token');
                
            }
            else if (response.data.message === 'No session') {
                Cookies.remove('user');
                Cookies.remove('auth_token');
                message.error('You are not signed in');
            } 
            else {
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




