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


// import React from 'react';
// import { Table } from 'antd';

// const columns = [
//   {
//     title: 'Period',
//     dataIndex: 'period',
//   },
//   {
//     title: 'Interest',
//     dataIndex: 'interest',
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
//       <Table columns={columns} dataSource={this.state.data} />
//     );
//   }
// }

// export default ProductInterestReport;


import React from 'react';
import { Input, Table } from 'antd';

const { Search } = Input;

const columns = [
  {
    title: 'Product ID',
    dataIndex: 'productID',
  },
  {
    title: 'Product Name',
    dataIndex: 'productName',
  },
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
      searchText: '',
    };
  }

  componentDidMount() {
    // Retrieve data for product sales or page views over different time periods from database or API
    const data = [
      {
        productID: '1',
        productName: 'Product 2',
        period: 'Jan',
        interest: 1000,
      },
      {
        productID: '2',
        productName: 'Product 2',
        period: 'Feb',
        interest: 2000,
      },
      {
        productID: '3',
        productName: 'Product 3',
        period: 'Mar',
        interest: 1500,
      },
    ];

    this.setState({ data });
  }

  handleSearch = searchText => {
    this.setState({ searchText });
  };

  render() {
    const { searchText, data } = this.state;
    const filteredData = data.filter(item => item.productID.includes(searchText));

    return (
      <div>
        <Search
          placeholder="Product ID"
          onSearch={this.handleSearch}
          style={{ width: 200 }}
        />
        <Table columns={columns} dataSource={filteredData} />
      </div>
    );
  }
}

export default ProductInterestReport;
