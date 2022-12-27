// import React from 'react';
// import { Line } from 'antd';

// const data = [
//   {
//     period: 'Jan',
//     interest: 1000,
//   },
//   {
//     period: 'Feb',
//     interest: 2000,
//   },
//   {
//     period: 'Mar',
//     interest: 1500,
//   },
// ];

// class ProductInterestReport extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     // Retrieve data for product sales or page views over different time periods from database or API
//     const data = [
//       {
//         period: 'Jan',
//         interest: 1000,
//       },
//       {
//         period: 'Feb',
//         interest: 2000,
//       },
//       {
//         period: 'Mar',
//         interest: 1500,
//       },
//     ];

//     this.setState({ data });
//   }

//   render() {
//     return (
//       <Line
//         data={this.state.data}
//         xField="period"
//         yField="interest"
//       />
//     );
//   }
// }

// export default ProductInterestReport;


import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Period',
    dataIndex: 'period',
  },
  {
    title: 'Interest',
    dataIndex: 'interest',
  },
];

class ProductInterestReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    // Retrieve data for product sales or page views over different time periods from database or API
    const data = [
      {
        period: 'Jan',
        interest: 1000,
      },
      {
        period: 'Feb',
        interest: 2000,
      },
      {
        period: 'Mar',
        interest: 1500,
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

export default ProductInterestReport;
