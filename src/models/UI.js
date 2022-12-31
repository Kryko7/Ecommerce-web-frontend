import React from 'react';
import { useState, useEffect } from 'react';
import { Button, Layout, Menu, Table, Typography } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/exports';
import { addToCart } from '../cartHandling/actions';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;


const FrontPage = ({categoryID}) => {
    const [products, setProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    //const [searchText, setSearchText] = useState('');
    const [categories, setCategories] = useState([]);


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
        // fetch("http://localhost:8080/api/ui/0", {method: 'GET'}).then(res => res.json()).then(res =>  setProducts(res)) }, []);
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:8080/api/ui/0');
            setProducts(response.data);
          } catch (e) {
            console.log(e);
          }
        };
        fetchProducts();
      }, [categoryID]);

    const handleMenuClick = (event) => {
        if (event.key === 'Show All') {
            setSelectedCategory(null);
        }
        else {
            setSelectedCategory(event.key);
        }
    };

    const filteredData = products.filter((product) => {
        if (!selectedCategory) {
            return true;
        }
        return product.category === selectedCategory;
    });

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
        </Header>
        <Layout>
            <Sider>
            <Menu onClick={handleMenuClick}>
                <Menu.Item key="Show All">Show All</Menu.Item>
                {/* <Menu.Item key="Category 1">Category 1</Menu.Item>
                <Menu.Item key="Category 2">Category 2</Menu.Item>
                <Menu.Item key="Category 3">Category 3</Menu.Item> */}
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


// columns={columns}
//     dataSource={products}

export default FrontPage;




