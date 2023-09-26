import React from 'react';
import { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'Category',
    dataIndex: 'category_name',
  },
  {
    title: 'Orders',
    dataIndex: 'total_quantity',
  },
];

const CategoriesReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/report/most-ordered-category');
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <Table columns={columns} dataSource={data} />
  );
};

export default CategoriesReport;

