import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Space, Tabs, Row, Col, Divider, Card } from 'antd';
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

    const ppvRefs = useRef({});
    const xyzRefs = useRef({});

    const ppvDivRefs = useRef({});
    const xyzDivRefs = useRef({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/wave/${filename}`);
                const rawData = response.data;

                const initialTab = {
                    key: '0',
                    label: '전체 그래프',
                    children: (
                        <div>
                            <Row>
                                <Col span={11} style={{ marginBottom: 20 }}>
                                    <Divider> PPV 그래프 </Divider>
                                    <div ref={(el) => (ppvDivRefs.current['0'] = el)}>
                                        <PPVChart ref={(ref) => (ppvRefs.current['0'] = ref)} data={rawData} />
                                    </div>
                                </Col>

                                <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Divider type="vertical" style={{ height: '80%' }} />
                                </Col>

                                <Col span={11} style={{ marginBottom: 20 }}>
                                    <Divider> XYZ 그래프 </Divider>
                                    <div ref={(el) => (xyzDivRefs.current['0'] = el)}>
                                        <XYZChart ref={(ref) => (xyzRefs.current['0'] = ref)} data={rawData} />
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
        const chartElement = chartType === 'ppv-container' ? ppvDivRefs.current[activeKey] : xyzDivRefs.current[activeKey]

        if (chartElement) {
            html2canvas(chartElement, { scale: 5}).then((canvas) => {
                const link = document.createElement('a')
                const filename = `${chartType}-${activeKey}.png`;
                
                link.download = filename;
                link.href = canvas.toDataURL();
                link.click();
            })
        }
    }

    const handleCalcResult = (resultData, titles, mapData) => {
        let annotations = [];
        
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
                            {Object.keys(mapData[index]).map((key, idx) => (
                                idx - 3 >= 0 ? (
                                    <Col span={5} key={`${mapData[index]}-${key}`} style={{marginRight: 10}}>
                                        <Card size="small" type="inner" title={key.toUpperCase()}>{mapData[index][key]}</Card>
                                    </Col>
                                ) : null
                            ))}
                        </Row>

                        <Row>
                            <Col span={11} style={{ marginBottom: 20 }}>
                                <Divider> PPV 그래프 </Divider>
                                <div ref={(el) => (ppvDivRefs.current[newActiveKey] = el)}>
                                    <PPVChart data={items} ref={(ref) => (ppvRefs.current[newActiveKey] = ref)}/>
                                </div>
                            </Col>

                            <Col span={2} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                <Divider type="vertical" style={{ height: '80%' }} />
                            </Col>

                            <Col span={11} style={{ marginBottom: 20 }}>
                                <Divider> XYZ 그래프 </Divider>
                                <div ref={(el) => (xyzDivRefs.current[newActiveKey] = el)}>
                                    <XYZChart ref={(ref) => (xyzRefs.current[newActiveKey] = ref)} data={items} />
                                </div>
                            </Col>
                        </Row>
                    </div>
                ),
            };

            setTabPanes((prevTabs) => [...prevTabs, newTabPane]);
            setActiveKey(newActiveKey);

            if (xyzRefs.current['0'] && typeof xyzRefs.current['0'].updateAnnotations === 'function') {
                const newAnnotations = handleAnnotations(items, titles[index]);

                annotations = [...annotations, ...newAnnotations]

                if (xyzRefs.current['0'] && ppvRefs.current['0']) {
                    xyzRefs.current['0'].updateAnnotations(annotations);
                    ppvRefs.current['0'].updateAnnotations(annotations);
                } else {
                    console.error('updateAnnotations 메서드를 찾을 수 없습니다.');
                }

            } else {
                console.error('updateAnnotations 메서드를 찾을 수 없습니다.');
            }
        });
    };

    const handleAnnotations = (items, title) => {
        const newAnnotations = [
            {
                type: 'region',
                start: [items[0].time, 'min'],
                end: [items[items.length - 1].time, 'max'],
                style: { fill: '#F4664A', fillOpacity: 0.2 } // 필요시 스타일 추가
            },
            {
                type: 'text',
                position: [items[Math.round((items.length - 1) / 2)].time, 'max'],
                content: title,
                style: {
                    fill: '#000',
                    fontSize: 14,
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textBaseline: 'middle'
                }
            }
        ];
        return newAnnotations
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
                        <Button type="link" onClick={() => setIsModal(true)}>
                            도표 분석
                        </Button>
                    </Space>
                }
            />

            <WaveModal
                open={ismodal}
                onCancel={() => setIsModal(false)}
                onCalc={handleCalcResult}
            />
        </div>
    );
};

export default WaveTable;