import React from 'react';
import AssetTable from '../../components/asset/AssetTable';
import { Layout, Menu, Breadcrumb, Table, Button, Input, DatePicker, Select, Space, message, theme } from 'antd';
import { SearchOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import MenuItem from 'antd/es/menu/MenuItem';

const { Header, Content, Footer, Sider } = Layout;

const menuItem = [{
    key: '홈',
    label: '홈',
    icon: <SearchOutlined />
    },
];

function Asset(props) {
    return (
        <Layout style={{ minHeight: '100vh' }}>

            <Sider style={{ background: '#fff', }} width={256}>
                <div />
                <Menu 
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['홈']}
                    mode='inline'
                    items={menuItem}
                />
            </Sider>


            <Layout>
                <Content style={{ margin: '0 16px' }}>
                    <h1>자원 현황</h1>
                    <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item>상품 관리</Breadcrumb.Item>
                    <Breadcrumb.Item>상품 목록</Breadcrumb.Item>
                    </Breadcrumb>
                    <div style={{ padding: 24, minHeight: 360 }}>
                        <AssetTable />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2023 Created by Ant UED</Footer>
            </Layout>
        </Layout>
    );
}

export default Asset;