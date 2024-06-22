import React from 'react';
import { Layout, Menu } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const Sidebar = () => {
  return (
    <Sider theme="dark" width={200}>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<UserOutlined />}>홈</Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>상품 관리</Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>개발</Menu.Item>
        <Menu.Item key="4" icon={<UserOutlined />}>사용 가이드</Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;