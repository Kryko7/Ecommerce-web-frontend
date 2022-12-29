import React from 'react';
import { Table, DatePicker } from 'antd';
import axios from 'axios';

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
    title: 'Quarter 1 - sales',
    dataIndex: 'q1_sales',
  },
  {
    title: 'Quarter 2 - sales',
    dataIndex: 'q2_sales',
  },
  {
    title: 'Quarter 3 - sales',
    dataIndex: 'q3_sales',
  },
  {
    title: 'Quarter 4 - sales',
    dataIndex: 'q4_sales',
  },
  {
    title: 'Total sales',
    dataIndex: 'total_sales',
  }
];



class SalesReport extends React.Component {
  state = {
    selectedYear: null,
    data: [],
  };

  onYearChange = async (date, dateString) => {
    this.setState({ selectedYear: date });

    try {
      const response = await axios.get(`http://localhost:8080/api/report/quaterly-sales-report`, {
        params: {
          year: dateString,
        },
      });
      this.setState({ data: response.data });
    }
    catch (error) {
      console.log(error);
    } 
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
        <Table columns={columns} dataSource={this.state.data} />
      </div>
    );
  }
}

export default SalesReport;





// const data = [
//   {
//     product_id: '1',
//     product_name: 'Product 1',
//     quarter1: '100',
//     quarter2: '200',
//     quarter3: '300',

//     quarter4: '400',
//   },
//   {
//     product_id: '2',
//     product_name: 'Product 2',
//     quarter1: '100',
//     quarter2: '200',
//     quarter3: '300',
//     quarter4: '400',
//   },
// ];

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