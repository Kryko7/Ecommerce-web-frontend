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



// const CategoriesReport = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:8080/api/report/most-ordered-category');
//         setData(response.data);
//       } catch (e) {
//         console.log(e);
//       }
//     };
//     fetchData();
//   }, []);

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
// class ProductInterestReport extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//       searchText: '',
//     };
//   }

//   componentDidMount() {
//     // Retrieve data for product sales or page views over different time periods from database or API
//     const data = [
//       {
//         productID: '1',
//         productName: 'Product 2',
//         period: 'Jan',
//         interest: 1000,
//       },
//       {
//         productID: '2',
//         productName: 'Product 2',
//         period: 'Feb',
//         interest: 2000,
//       },
//       {
//         productID: '3',
//         productName: 'Product 3',
//         period: 'Mar',
//         interest: 1500,
//       },
//     ];

//     this.setState({ data });
//   }

//   handleSearch = searchText => {
//     this.setState({ searchText });
//   };

//   render() {
//     const { searchText, data } = this.state;
//     const filteredData = data.filter(item => item.productID.includes(searchText));

//     return (
//       <div>
//         <Search
//           placeholder="Product ID"
//           onSearch={this.handleSearch}
//           style={{ width: 200 }}
//         />
//         <Table columns={columns} dataSource={filteredData} />
//       </div>
//     );
//   }
// }

// export default ProductInterestReport;
