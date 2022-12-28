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
import { Form, Input, Table, Button, DatePicker } from 'antd';
const { RangePicker } = DatePicker;


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

class DateForm extends React.Component {
  onFinish = values => {
    console.log('Success:', values);
  };

  onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  render() {
    return (
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
      >
        <Form.Item
          label="Date Range"
          name="dateRange"
          rules={[{ required: true, message: 'Please input a date range!' }]}
        >
          <RangePicker />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
















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
        product_id: '1',
        product_name: 'Product 1',
        orders: '100',
      },
      {
        product_id: '2',
        product_name: 'Product 2',
        orders: '200',
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


function ProductReportwithDate() {
  return (
    <div className="App">
      <DateForm />
      <ProductsReport />
    </div>
  );
}
export default ProductReportwithDate;
