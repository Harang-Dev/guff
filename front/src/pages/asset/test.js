import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Layout, Menu, Breadcrumb, Table, Button, Input, DatePicker, Select, Space, message } from 'antd';
import { SearchOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

const Test = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ current: 1, pageSize: 10 });

  const fetchProducts = async (params = {}) => {
    setLoading(true);
    try {
      const response = await axios.get('/api/products', { params });
      setProducts(response.data.products);
      setPagination({
        ...params.pagination,
        total: response.data.total,
      });
    } catch (error) {
      message.error('Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts({
      pagination,
    });
  }, []);

  const handleTableChange = (pagination, filters, sorter) => {
    fetchProducts({
      sortField: sorter.field,
      sortOrder: sorter.order,
      pagination,
      ...filters,
    });
  };

  const columns = [
    {
      title: '상품코드',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '상품명',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '금액',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
    },
    {
      title: '판매상태',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: '판매중', value: 'SALE' },
        { text: '품절', value: 'SOLDOUT' },
        { text: '판매중단', value: 'NOTSALE' },
      ],
    },
    {
      title: '생성일시',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '수정일시',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '액션',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button>수정</Button>
          <Button danger>삭제</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <span>홈</span>
          </Menu.Item>
          <Menu.Item key="2">
            <span>상품 목록</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>상품 관리</Breadcrumb.Item>
            <Breadcrumb.Item>상품 목록</Breadcrumb.Item>
          </Breadcrumb>
          <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
            <Space direction="vertical" style={{ width: '100%' }}>
              <Space>
                <RangePicker />
                <Select defaultValue="전체" style={{ width: 120 }}>
                  <Option value="전체">전체</Option>
                  <Option value="판매중">판매중</Option>
                  <Option value="품절">품절</Option>
                  <Option value="판매중단">판매중단</Option>
                </Select>
                <Input placeholder="상품명" style={{ width: 200 }} />
                <Button type="primary" icon={<SearchOutlined />}>검색</Button>
                <Button>초기화</Button>
              </Space>
              <Space>
                <Button type="primary" icon={<PlusOutlined />}>상품등록</Button>
                <Button icon={<DownloadOutlined />}>엑셀 다운로드</Button>
              </Space>
              <Table
                columns={columns}
                rowKey={record => record.id}
                dataSource={products}
                pagination={pagination}
                loading={loading}
                onChange={handleTableChange}
              />
            </Space>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

export default Test;