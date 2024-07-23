import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Modal, Form, Input, notification, Select, Table, List, Row, Col } from 'antd';
import axios from 'axios';
import './App.css';

const { Header, Content, Footer } = Layout;
const { Option } = Select;

const App = () => {
  const [products, setProducts] = useState([
    { name: 'Gansito', price: 30, imageUrl: 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750100015310L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' },
    { name: 'Refresco', price: 10, imageUrl: 'https://www.coca-cola.com/content/dam/onexp/mx/es/brands/coca-cola/coca-cola-original/Product-Information-Section-Coca-Cola-Original.jpg' },
    { name: 'Hamburguesa', price: 50, imageUrl: 'https://img.freepik.com/foto-gratis/deliciosa-hamburguesa-aislado-sobre-fondo-blanco_125540-3368.jpg' },
    { name: 'Papas Fritas', price: 20, imageUrl: 'https://i5.walmartimages.com.mx/gr/images/product-images/img_large/00750101116765L.jpg?odnHeight=612&odnWidth=612&odnBg=FFFFFF' }
  ]);
  const [orders, setOrders] = useState([]);
  const [groupedOrders, setGroupedOrders] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [orderItems, setOrderItems] = useState([]);
  const [selectedCustomerOrders, setSelectedCustomerOrders] = useState([]);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);

  const apiUrl = import.meta.env.VITE_PARROT_API_URL;

  const fetchOrders = async () => {
    try {
      let allOrders = [];
      let url = `${apiUrl}/orders/`;
      while (url) {
        const response = await axios.get(url);
        allOrders = [...allOrders, ...response.data.results];
        url = response.data.next;
      }
      setOrders(allOrders);
      groupOrdersByCustomer(allOrders);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    }
  };

  const groupOrdersByCustomer = (orders) => {
    const grouped = orders.reduce((acc, order) => {
      if (!acc[order.customerName]) {
        acc[order.customerName] = { totalItems: 0, totalPrice: 0, orders: [] };
      }
      acc[order.customerName].orders.push(order);
      acc[order.customerName].totalItems += 1;
      acc[order.customerName].totalPrice += parseFloat(order.price);
      return acc;
    }, {});
    setGroupedOrders(grouped);
  };

  const createOrder = async (values) => {
    try {
      const promises = orderItems.map(item => {
        return axios.post(`${apiUrl}/orders/`, {
          customerName: values.customerName,
          itemName: item.name,
          price: item.price.toFixed(2),
        });
      });
      await Promise.all(promises);
      notification.success({ message: 'Order created successfully!' });
      fetchOrders();
      setIsModalVisible(false);
      form.resetFields();
      setOrderItems([]);
    } catch (error) {
      console.error('Failed to create order:', error);
      notification.error({ message: 'Failed to create order!' });
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
    setOrderItems([]);
  };

  const addItemToOrder = (itemName) => {
    const product = products.find(product => product.name === itemName);
    if (product) {
      setOrderItems([...orderItems, product]);
    }
  };

  const showDetailModal = (customerName) => {
    setSelectedCustomerOrders(groupedOrders[customerName].orders);
    setIsDetailModalVisible(true);
  };

  const handleDetailModalCancel = () => {
    setIsDetailModalVisible(false);
    setSelectedCustomerOrders([]);
  };

  const columns = [
    {
      title: 'Customer',
      dataIndex: 'customerName',
      key: 'customerName',
    },
    {
      title: 'Total Items',
      dataIndex: 'totalItems',
      key: 'totalItems',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (text) => `$${text.toFixed(2)}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text, record) => (
        <Button type="link" onClick={() => showDetailModal(record.customerName)}>Open</Button>
      ),
    },
  ];

  const data = Object.keys(groupedOrders).map(customerName => ({
    customerName,
    totalItems: groupedOrders[customerName].totalItems,
    totalPrice: groupedOrders[customerName].totalPrice,
  }));

  return (
    <Layout className="layout">
      <Header className="header">
        <div className="logo">
          <img src="/logo_square.png" alt="Parrot Logo" className="logo"/>
        </div>
      </Header>
      <Content className="content">
        <div className="site-layout-content">
          <Button type="primary" onClick={showModal} className="add-order-button">Add Order</Button>
          <h1 className="orders-title">Orders by Customer</h1>
          <Table
            dataSource={data}
            columns={columns}
            rowKey="customerName"
            className="orders-table"
            pagination={{ pageSize: 5 }}
          />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Restaurant POS ©2024</Footer>

      <Modal
        title="Create Order"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={createOrder}>
          <Form.Item
            name="customerName"
            label="Customer Name"
            rules={[{ required: true, message: 'Please input customer name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Select Item"
          >
            <Select
              placeholder="Select a product"
              onChange={addItemToOrder}
            >
              {products.map((product) => (
                <Option key={product.name} value={product.name}>
                  {product.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <List
            header={<div>Order Items</div>}
            bordered
            dataSource={orderItems}
            renderItem={item => (
              <List.Item>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  style={{ width: 50, height: 50, marginRight: 10 }}
                />
                {item.name} - ${item.price}
              </List.Item>
            )}
          />
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Order
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Order Details"
        visible={isDetailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={null}
      >
        <List
          header={<div>Customer Orders</div>}
          bordered
          dataSource={selectedCustomerOrders}
          renderItem={order => (
            <List.Item>
              <img
                src={products.find(product => product.name === order.itemName).imageUrl}
                alt={order.itemName}
                style={{ width: 50, height: 50, marginRight: 10 }}
              />
              {order.itemName} - ${order.price}
            </List.Item>
          )}
        />
      </Modal>
    </Layout>
  );
};

export default App;
