import React from 'react';
import { useState, useEffect } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const columns = [
  {
    title: 'Category',
    dataIndex: 'category_name',
  },
  {
    title: 'Orders',
    dataIndex: 'total_quantity',
  },
];

const CategoriesReport = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/report/most-ordered-category');
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchData();
  }, []);

  return (
    <Table columns={columns} dataSource={data} />
  );
};

export default CategoriesReport;

// import React from 'react';
// import { Bar } from 'antd';

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

// class CategoriesReport extends React.Component {
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

// export default CategoriesReport;


// import React, { useEffect } from 'react';
// import { Table } from 'antd';
// import axios from 'axios';
// import { useState } from 'react';

// const columns = [
//   {
//     title: 'Category',
//     dataIndex: 'category',
//   },
//   {
//     title: 'Orders',
//     dataIndex: 'orders',
//   },
// ];

// class CategoriesReport extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidMount() {
//     // Retrieve order data for products from database or API
//     const [data, setData] = useState([]);
//     useEffect(() => {

//       const fetchData = async () => {
//         try {
//           const response = await axios.get('http://localhost:8080/api/report/most-ordered-category');
//           setData(response.data);
//         } catch (e) {
//           console.log(e);
//         }
//       };
//       fetchData();
//     }, []);

  

//     this.setState({ data });
//   }

//   render() {
//     return (
//       <Table columns={columns} dataSource={this.state.data} />
//     );
//   }
// }

// export default CategoriesReport;

// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const columns = [
//   {
//     title: 'Category',
//     dataIndex: 'category',
//   },
//   {
//     title: 'Orders',
//     dataIndex: 'orders',
//   },
// ];

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

//   return (
//     <Table columns={columns} dataSource={data} />
//   );
// };

// export default CategoriesReport;




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



// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const columns = [
//   {
//     title: 'Category',
//     dataIndex: 'category',
//   },
//   {
//     title: 'Orders',
//     dataIndex: 'orders',
//   },
// ];

// export default CategoriesReport = () => {
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

//   return (
//     <Table columns={columns} dataSource={data} />
//   );
// };


// import axios from 'axios';

// const columns = [
//   {
//     title: 'Category',
//     dataIndex: 'category',
//   },
//   {
//     title: 'Orders',
//     dataIndex: 'orders',
//   },
// ];

// class CategoriesReport extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }

//   componentDidUpdate(prevProps) {
//     // Retrieve order data for products from database or API
//     if (this.props.fetchData !== prevProps.fetchData) {
//       axios.get('http://localhost:8080/api/report/most-ordered-category')
//         .then(response => this.setState({ data: response.data }))
//         .catch(error => console.log(error));
//     }
//   }

//   render() {
//     return (
//       <Table columns={columns} dataSource={this.state.data} />
//     );
//   }
// }

// export default CategoriesReport;
