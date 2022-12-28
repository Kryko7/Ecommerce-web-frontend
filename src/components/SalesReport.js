import React from 'react';
import { Table, DatePicker } from 'antd';

const columns = [
  {
    title: 'Product ID',
    dataIndex: 'product_id',
  },
  {
    title: 'Product Name',
    dataIndex: 'product_name',
  },
  {
    title: 'Quarter 1',
    dataIndex: 'quarter1',
  },
  {
    title: 'Quarter 2',
    dataIndex: 'quarter2',
  },
  {
    title: 'Quarter 3',
    dataIndex: 'quarter3',
  },
  {
    title: 'Quarter 4',
    dataIndex: 'quarter4',
  },
];

const data = [
  {
    product_id: '1',
    product_name: 'Product 1',
    quarter1: '100',
    quarter2: '200',
    quarter3: '300',

    quarter4: '400',
  },
  {
    product_id: '2',
    product_name: 'Product 2',
    quarter1: '100',
    quarter2: '200',
    quarter3: '300',
    quarter4: '400',
  },
];

// class SalesReport extends React.Component {
//   render() {
//     return (
//       <div>
//         <DatePicker placeholder="Select year" />
//         <Table columns={columns} dataSource={data} />
//       </div>
//     );
//   }
// }

class SalesReport extends React.Component {
  state = {
    selectedYear: null,
  };

  onYearChange = (date, dateString) => {
    this.setState({ selectedYear: date });
  };
  // onChange={(date, dateString) => this.setState({ selectedYear: date })}

  render() {
    return (
      <div>
        <DatePicker
          placeholder="Select year"
          mode="year"
          format="YYYY"
          onChange={this.onYearChange}
        />
        <Table columns={columns} dataSource={data} />
      </div>
    );
  }
}

export default SalesReport;
