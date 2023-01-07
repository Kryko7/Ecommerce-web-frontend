import React from 'react';
import { Input, Table } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';

const { Search } = Input;

const columns = [
  {
    title: 'Customer ID',
    dataIndex: 'user_id',
  },
  {
    title: 'Customer',
    dataIndex: 'user_id',
  },
  {
    title: 'Order ID',
    dataIndex: 'order_id',
  },
  {
    title: 'Order Status',
    dataIndex: 'order_status',
  },
  {
    title: 'Date',
    dataIndex: 'order_date',
  },
  {
    title: 'Payment Type',
    dataIndex: 'payment_method',
  },
  {
    title: 'Delivery Type',
    dataIndex: 'delivery_method',
  },
  {
    title: 'Total',
    dataIndex: 'order_total',
  },
];


const CustomerOrderReport = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (searchText) {
        try {
          const response = await axios.get('http://localhost:8080/api/report/customer-order-report', {params: {customer_id: searchText}});
          setData(response.data);
        } catch (e) {
          console.log(e);
        }
      }
    };
    fetchData();
  }, [searchText]);

  const handleSearch = searchText => {
    setSearchText(searchText);
  };
 
  return (
    <div>
      <Search
        placeholder="Search by customer ID"
        onSearch={handleSearch}
        style={{ width: 200 }}
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default CustomerOrderReport;

