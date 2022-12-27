// import React from 'react';
// import { Bar } from 'antd/lib/charts';

// const data = [
//   {
//     category: 'Category A',
//     orders: 1000,
//   },
//   {
//     category: 'Category B',
//     orders: 2000,
//   },
//   {
//     category: 'Category C',
//     orders: 1500,
//   },
// ];

// class ProductsReport extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     // Retrieve order data for products from database or API
//     const data = [
//       {
//         category: 'Category A',
//         orders: 1000,
//       },
//       {
//         category: 'Category B',
//         orders: 2000,
//       },
//       {
//         category: 'Category C',
//         orders: 1500,
//       },
//     ];

//     this.setState({ data });
//   }

//   render() {
//     return (
//       <Bar
//         data={this.state.data}
//         xField="category"
//         yField="orders"
//       />
//     );
//   }
// }

// export default ProductsReport;


import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Category',
    dataIndex: 'category',
  },
  {
    title: 'Orders',
    dataIndex: 'orders',
  },
];

class ProductsReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // Retrieve order data for products from database or API
    const data = [
      {
        category: 'Category A',
        orders: 1000,
      },
      {
        category: 'Category B',
        orders: 2000,
      },
      {
        category: 'Category C',
        orders: 1500,
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

export default ProductsReport;
