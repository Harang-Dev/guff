import React from 'react';
import { Layout, Menu, Divider, } from 'antd';
import { UserOutlined, HomeOutlined, AppstoreOutlined, PythonOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import './layout.css';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;


const CustomLayout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleMenuClick = (e) => {
        navigate(e.key);
    };

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Helmet><title>Guff</title></Helmet>
            <Layout>
                <Sider width={250} collapsible>
                    <Menu
                        mode="inline"
                        defaultOpenKeys={['sub1', 'sub2', 'sub3']}
                        selectedKeys={[location.pathname]}
                        style={{ height: '100%', borderRight: 0 }}
                        onClick={handleMenuClick}
                    >
                        <Menu.Item key="/" icon={ <HomeOutlined />} Link>
                            홈
                        </Menu.Item>

                        <SubMenu key="sub1" icon={<PythonOutlined />} title="분석기">
                            <Menu.Item key="/analyze">한글 분석기</Menu.Item>
                        </SubMenu>
                    
                        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="자산 관리">
                            <Menu.Item key="/battery-asset">배터리 관리</Menu.Item>
                            <Menu.Item key="/asset">계측기 관리</Menu.Item>
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
                        {children}
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>
                        Guff ©{new Date().getFullYear()} Created by Dobby
                    </Footer>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default CustomLayout;