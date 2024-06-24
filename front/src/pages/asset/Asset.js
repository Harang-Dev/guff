import React from 'react';
import AssetTable from '../../components/asset/AssetTable';
import { Layout, Menu, Breadcrumb, Table, Button, Input, DatePicker, Select, Space, message, theme, Divider, Typography } from 'antd';
import { SearchOutlined, DownloadOutlined, PlusOutlined, UserOutlined, HomeOutlined, AppstoreOutlined, PythonOutlined} from '@ant-design/icons';
import MenuItem from 'antd/es/menu/MenuItem';
import Paragraph from 'antd/es/skeleton/Paragraph';
import './asset.css';

const { Title } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


function Asset(props) {
    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Layout>
                <Sider width={250} className={"sidebar site-layout-background"} collapsible>
                    <Menu
                        mode="inline"
                        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="home" icon={ <HomeOutlined />}>
                            홈
                        </Menu.Item>

                        <SubMenu key="sub1" icon={<PythonOutlined />} title="분석기">
                            <Menu.Item key="1">한글 분석기</Menu.Item>
                        </SubMenu>
                    
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="자산 관리">
                            <Menu.Item key="2">배터리 현황</Menu.Item>
                            <Menu.Item key="3">계측기 현황</Menu.Item>
                        </SubMenu>

                        <Divider />

                        <SubMenu key="sub3" icon={<UserOutlined />} title="사용 가이드">
                            <Menu.Item key="4">한글 분석기</Menu.Item>
                            <Menu.Item key="5">자산 관리</Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>

                <Layout style={{ padding: '0 24px 24px' }}>
                    <Content 
                        className='site-layout-background'
                        style={{ padding: 24, margin: 0, minHeight: 280, }}
                    >
                        <Typography>
                            <Title>
                                계측기 관리
                            </Title>
                        </Typography>
                        <AssetTable/>
                    </Content>
                </Layout>
                
            </Layout>
        </Layout>
    );
}

export default Asset;