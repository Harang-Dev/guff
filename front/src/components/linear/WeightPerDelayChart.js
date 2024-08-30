import React, { useState, useEffect, useRef, Children } from 'react';
import { Button, Space, Tabs, Row, Col, Divider, Card, Table, Input, message, Typography,Form, InputNumber } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import EditableTable from '../layout/EditableTable';

const { Title } = Typography; 
const API_URL = process.env.REACT_APP_API_URL;

const WieghtPerDelayChart = ({ dataSource, onSave, filename }) => {
    const [delayColumn, setDelayColumns] = useState([0.02, 0.2, 0.254, 0.3, 0.5, 2.54]);
    const [linearData, setLinearData] = useState(null);
    const [distance, setDistance] = useState([]);
    const [tableData, setTableData] = useState([]);

    const [form] = Form.useForm();

    useEffect(() => {
        const setLinRegressResultData = async() => {
            try {
                const response = await axios.get(`${API_URL}/linear/linregress/result/${filename}`);
                setLinearData(response.data);
            } catch (error) {
                message.error('회귀분석 결과 조회 실패!')
            }
        }

        setLinRegressResultData();
    }, []) 

    useEffect(() => {
        const tempData = []
        distance.map((item, index) => {
            const temp = {distance: item}
            delayColumn.map((delay, index) => {
                temp[`delay${index + 1}`] = (delay / linearData.k95) ** (2/(-linearData.nValue)) * item ** 2
            })
            tempData.push(temp)
        })
    
        if (tempData) setTableData(tempData); 
        console.log(tempData);
    }, [distance])

    const onFinish = (values) => {
        const start = values.startDistance;
        const end = values.endDistance;
        const interval = values.interval;

        const length = Math.ceil((end - start) / interval) + 1;
        const distanceArray = Array.from({ length }, (_, index) => start + index * interval);

        setDistance(distanceArray);
    };

    const columns = [
        {
            title: 'Distance (m)',
            dataIndex: 'distance',
            align: 'center',
        },
        {
            title: '진동 기준에 따른 이격거리별 최대 허용 지발당 장약량 (kg/delay)',
            align: 'center',
            children: delayColumn.map((item, index) => ({
                title: `${item}cm/sec`,
                dataIndex: `delay${index + 1}`,
                align: 'center'
            }))
        }
    ]

    return (
        <div>
            {
                tableData.length > 0 ? (
                    <div>
                    <Table 
                        columns={columns}
                        dataSource={tableData}
                    />
                    <Button onClick={() => setTableData([])}>값비우기</Button>
                    </div>
                )
                :
                (
                    <Form form={form} onFinish={onFinish}>
                        <Row gutter={[16, 16]}>
                            <Col span={4}>
                                <Title level={5}>Start Distance</Title>
                                <Form.Item name="startDistance" rules={[{ required: true, message: 'Start Distance is required' }]}>
                                    <InputNumber />
                                </Form.Item>
                            </Col>
        
                            <Col span={4}>
                                <Title level={5}>End Distance</Title>
                                <Form.Item name="endDistance" rules={[{ required: true, message: 'End Distance is required' }]}>
                                    <InputNumber />
                                </Form.Item>
                            </Col>
        
                            <Col span={4}>
                                <Title level={5}>Interval</Title>
                                <Form.Item name="interval" rules={[{ required: true, message: 'Interval is required' }]}>
                                    <InputNumber />
                                </Form.Item>
                            </Col>
        
                            <Col span={24}>
                                <Button type="primary" htmlType="submit">계산</Button>
                                <Button onClick={() => setTableData([])}>값비우기</Button>
                            </Col>
                        </Row>
                    </Form>
                )
            }
        </div>
    )
}

export default WieghtPerDelayChart;