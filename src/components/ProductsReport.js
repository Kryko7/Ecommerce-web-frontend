
// import React from 'react';
// import { Form, Input, Table, Button, DatePicker } from 'antd';
// import axios from 'axios';

// const { RangePicker } = DatePicker;


// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };

// class DateForm extends React.Component {
//   state = {
//     data: [],
//   };
//   onFinish = (changedValues, allValues) => {
//     const { dateRange } = this.props;
//     if (dateRange && dateRange.length === 2) {
//       const startDate = dateRange[0].format('YYYY-MM-DD');
//       const endDate = dateRange[1].format('YYYY-MM-DD');
//       axios.get(`/api/report/products-with-most-sales`, {
//         params: {
//           start_date: startDate,
//           end_date: endDate,
//           },
//         })
//         .then(response => {
//           this.setState({ data: response.data });
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }
//   };

//   onFinishFailed = errorInfo => {
//     console.log('Failed:', errorInfo);
//   };






//   render() {
//     return (
//       <Form
//         {...layout}
//         name="basic"
//         initialValues={{ remember: true }}
//         onFinish={this.props.onFinish}
//         onFinishFailed={this.onFinishFailed}
//       >
//         <Form.Item
//           label="Date Range"
//           name="dateRange"
//           rules={[{ required: true, message: 'Please input a date range!' }]}
//         >
//           <RangePicker />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Submit
//           </Button>
//         </Form.Item>
//       </Form>
//     );
//   }
// }


// const columns = [
//   {
//     title: 'Product ID',
//     dataIndex: 'product_item_id',
//   },
//   {
//     title: 'Product Name',
//     dataIndex: 'product_name',
//   },
//   {
//     title: 'Orders',
//     dataIndex: 'total_sales',
//   },
// ];

// class ProductsReport extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [],
//     };
//   }



//   render() {
//     return (
//       <Table columns={columns} dataSource={this.props.data} />
//     );
//   }
// }




// class ProductReportwithDate extends React.Component {
//   state = {
//     data: [],
//   }

//   onFinish = (changedValues, allValues) => {
//     const { dateRange } = allValues;
//     console.log("LOL");
//     if (dateRange && dateRange.length === 2) {
//       console.log("LOL2");
//       const startDate = dateRange[0].format('YYYY-MM-DD');
//       const endDate = dateRange[1].format('YYYY-MM-DD');
//       axios.get(`/api/report/products-with-most-sales`, {
//         params: {
//           start_date: startDate,
//           end_date: endDate,
//           },
//         })
//         .then(response => {
//           this.setState({ data: response.data });
//         })
//         .catch(error => {
//           console.log(error);
//         });
//     }
//   };
//   render() {
//     return (
//       <div className="App">
//         <DateForm onFinish={this.onFinish}/>
//         <ProductsReport data={this.state.data}/>
//       </div>
//     );
//   }
// }

// export default ProductReportwithDate;





  // onFinish = (changedValues, allValues) => {
  //   const { dateRange } = allValues;
  //   if (dateRange && dateRange.length === 2) {
  //     const startDate = dateRange[0].format('YYYY-MM-DD');
  //     const endDate = dateRange[1].format('YYYY-MM-DD');
  //     axios.get(`/api/report/products-with-most-sales`, {
  //       params: {
  //         start_date: startDate,
  //         end_date: endDate,
  //         },
  //       })
  //       .then(response => {
  //         this.setState({ data: response.data });
  //       })
  //       .catch(error => {
  //         console.log(error);
  //       });
  //   }
  // };




  // function ProductReportwithDate() {
//   return (
//     <div className="App">
//       <DateForm />
//       <ProductsReport data={this.state.data}/>
//     </div>
//   );
// }
// export default ProductReportwithDate;


  // state = {
  //   data: [],
  // };




import React, { useState } from 'react';
import axios from 'axios';
import { Form, Input, Table, Button } from 'antd';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

function DateForm() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [data, setData] = useState([]);

  const onFinish = async (values) => {
    const startDateFormatted = new Date(startDate).toISOString().slice(0, 10);
    const endDateFormatted = new Date(endDate).toISOString().slice(0, 10);
    try {
      const response = await axios.get('http://localhost:8080/api/report/products-with-most-sales', {
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };


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
      title: 'Orders',
      dataIndex: 'total_sales',
    },
  ];

  return (
    <div>
      <Form {...layout} name="basic" onFinish={onFinish}>
        <Form.Item label="Start Date" name="startDate">
          <Input type="date" onChange={(e) => setStartDate(e.target.value)} />
        </Form.Item>
        <Form.Item label="End Date" name="endDate">
          <Input type="date" onChange={(e) => setEndDate(e.target.value)} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default DateForm;