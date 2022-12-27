import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Customer',
    dataIndex: 'customer',
  },
  {
    title: 'Order ID',
    dataIndex: 'orderId',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Total',
    dataIndex: 'total',
  },
];

class CustomerOrderReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // Retrieve customer and order data from database or API
    const data = [
      {
        customer: 'John Smith',
        orderId: '12345',
        date: '01/01/2022',
        total: 100,
      },
      {
        customer: 'Jane Doe',
        orderId: '23456',
        date: '02/01/2022',
        total: 200,
      },
      {
        customer: 'Bob Johnson',
        orderId: '34567',
        date: '03/01/2022',
        total: 150,
      },
    ];

    this.setState({ data });
  }

  render() {
    return (
      <Table columns={columns} dataSource={this.state.data} />
    );
  }
}

export default CustomerOrderReport;
