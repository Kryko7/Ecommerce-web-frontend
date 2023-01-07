

import React from 'react';
import { Input, Table } from 'antd';
import axios from 'axios';
import { useState, useEffect } from 'react';

const { Search } = Input;

const columns = [
  {
    title: 'Product ID',
    dataIndex: 'product_item_id',
  },
  {
    title: 'Product Name',
    dataIndex: 'product_name',
  },
  {
    title: 'Number of sales',
    dataIndex: 'num_sales',
  },
  {
    title: 'Year',
    dataIndex: 'year',
  },
  {
    title: 'Month',
    dataIndex: 'month',
  },
  {
    Quater: 'Quater',
    dataIndex: 'quater',
  },
];



const ProductInterestReport = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/report/most-interest-period');
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);


  const handleSearch = searchText => {
    setSearchText(searchText);
  };

  const filteredData = data.filter(item => String(item.product_item_id).includes(searchText));


    return (
      <div>
        <Search
          placeholder="Product ID"
          onSearch={handleSearch}
          style={{ width: 200 }}
        />
        <Table columns={columns} dataSource={filteredData} />
      </div>
    );
}

export default ProductInterestReport;

