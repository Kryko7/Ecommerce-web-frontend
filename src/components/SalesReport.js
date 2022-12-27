import React from 'react';
import { Table, DatePicker } from 'antd';

const columns = [
  {
    title: 'Quarter',
    dataIndex: 'quarter',
  },
  {
    title: 'Sales',
    dataIndex: 'sales',
  },
];

const data = [
  {
    quarter: 'Q1',
    sales: 1000,
  },
  {
    quarter: 'Q2',
    sales: 2000,
  },
  {
    quarter: 'Q3',
    sales: 3000,
  },
  {
    quarter: 'Q4',
    sales: 4000,
  },
];

class SalesReport extends React.Component {
  render() {
    return (
      <div>
        <DatePicker placeholder="Select year" />
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default SalesReport;
