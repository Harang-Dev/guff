import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Space, Tabs, Row, Col, Divider } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import html2canvas from 'html2canvas';
import WaveModal from './WaveModal';
import PPVChart from './PPVChart';
import XYZChart from './XYZChart';

const API_URL = process.env.REACT_APP_API_URL;

const WaveTable = () => {
    const location = useLocation();
    const { filename } = location.state || {};

    const [ismodal, setIsModal] = useState(false);
    const [tabPanes, setTabPanes] = useState([]);
    const [activeKey, setActiveKey] = useState('0');

    // UseRefs for each tab's chart container
    const ppvRefs = useRef({});
    const xyzRefs = useRef({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/wave/${filename}`);
                const rawData = response.data;
                
                // Create the initial tab with the graphs
                const initialTab = {
                    key: '0',
                    label: '전체 그래프',
                    children: (
                        <div>
                            <Row>
                                <Col span={11} style={{marginBottom : 20}}>
                                    <Divider> PPV 그래프 </Divider>
                                    <div ref={(el) => (ppvRefs.current['0'] = el)}>
                                        <PPVChart data={rawData} />
                                    </div>
                                </Col>

                                <Col span={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Divider type='vertical' style={{ height: '80%' }} />                                
                                </Col>

                                <Col span={11} style={{marginBottom: 20}}>
                                    <Divider> XYZ 그래프 </Divider>
                                    <div ref={(el) => (xyzRefs.current['0'] = el)}>
                                        <XYZChart data={rawData} />
                                    </div>
                                </Col>
                            </Row>
                        </div>
                    ),
                };
                setTabPanes([initialTab]);
                setActiveKey('0');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [filename]);

    const handleDownload = (chartType) => {
        const chartElement =
            chartType === 'ppv-container'
                ? ppvRefs.current[activeKey]
                : xyzRefs.current[activeKey];
        
        if (chartElement) {
            html2canvas(chartElement, { scale: 10 }).then((canvas) => {
                const link = document.createElement('a');
                const fileName = `${chartType}-${activeKey}.png`;
                link.download = fileName;
                link.href = canvas.toDataURL();
                link.click();
            });
        }
    };

    const showModal = () => {
        setIsModal(true);
    };

    const cancelModal = () => {
        setIsModal(false);
    };

    const handleCalcResult = (resultData, titles) => {
        if (tabPanes.length > 1) {
            setTabPanes(tabPanes.filter((item) => item.key === '0'));
            setActiveKey('0');
        }

        resultData.map((items, index) => {
            const newActiveKey = `${tabPanes.length + index}`;
            const newTabPane = {
                key: newActiveKey,
                label: titles[index],
                children: (
                    <div>
                        <Row>
                            <Col span={11} style={{marginBottom : 20}}>
                                <Divider> PPV 그래프 </Divider>
                                <div ref={(el) => (ppvRefs.current[newActiveKey] = el)}>
                                    <PPVChart data={items} />
                                </div>
                            </Col>

                            <Col span={2} style={{display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Divider type='vertical' style={{ height: '80%' }} />                                
                            </Col>

                            <Col span={11} style={{marginBottom: 20}}>
                                <Divider> XYZ 그래프 </Divider>
                                <div ref={(el) => (xyzRefs.current[newActiveKey] = el)}>
                                    <XYZChart data={items} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                ),
            };

            setTabPanes((prevTabs) => [...prevTabs, newTabPane]);
            setActiveKey(newActiveKey);
        });
    };

    return (
        <div>
            <Tabs 
                activeKey={activeKey} 
                onChange={(key) => setActiveKey(key)}
                items={tabPanes}
                tabBarExtraContent={
                    <Space>
                        <Button type="link" icon={<DownloadOutlined />} onClick={() => handleDownload('ppv-container')}>
                            PPV Graph
                        </Button>
                        <Button type="link" icon={<DownloadOutlined />} onClick={() => handleDownload('xyz-container')}>
                            XYZ Graph
                        </Button>
                        <Button type="link" onClick={showModal}>
                            도표 분석
                        </Button>
                    </Space>
                }
            />

            <WaveModal 
                open={ismodal}
                onCancel={cancelModal}
                onCalc={handleCalcResult}
            />

        </div>
    );
}

export default WaveTable;