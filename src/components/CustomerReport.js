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

// class CustomerOrderReport extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     // Retrieve customer and order data from database or API
//     const data = [
//       {
//         customer: 'John Smith',
//         orderId: '12345',
//         date: '01/01/2022',
//         total: 100,
//       },
//       {
//         customer: 'Jane Doe',
//         orderId: '23456',
//         date: '02/01/2022',
//         total: 200,
//       },
//       {
//         customer: 'Bob Johnson',
//         orderId: '34567',
//         date: '03/01/2022',
//         total: 150,
//       },
//     ];

//     this.setState({ data });
//   }

//   render() {
//     return (
//       <Table columns={columns} dataSource={this.state.data} />
//     );
//   }
// }

// export default CustomerOrderReport;


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



 //const filteredData = data.filter((item) => {String(item.customerId).includes(searchText)});