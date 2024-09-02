import React, { useState, useEffect, useRef, Children } from 'react';
import { Button, Space, Tabs, Row, Col, Divider, Card, Table, Input, message, Typography,Form, InputNumber, Collapse } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import EstimatedEquationChart from './EstimatedEquationChart';
import WeightPerDelayChart from './WeightPerDelayChart';

const { Title } = Typography; 
const API_URL = process.env.REACT_APP_API_URL;

const NomoGramChart = ({ filename }) => {
    const [linearData, setLinearData] = useState(null);
    const [standardWave, setStandardWave] = useState(null);
    const [distance, setDistance] = useState([]);
    const [items, setItems] = useState(null);

    const [form] = Form.useForm()

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
        if (standardWave) {
            const items = [
                {
                    key: '1',
                    label: '발파진동 추정식 현황',
                    children: (
                        <div>
                            <EstimatedEquationChart
                                linearData={linearData}
                            />
                        </div>
                    )
                },
                {
                    key: '2',
                    label: `진동기준 ${standardWave.toFixed(3)}cm/sec 적용 시 이격 거리별 Nomogram 현황`,
                    children: (
                        <div>
                            <WeightPerDelayChart
                                linearData={linearData}
                                standardWave={standardWave}
                                distance={distance}
                            />
                        </div>
                    )
                }
            ]

            setItems(items);
        }
    }, [standardWave])

    const onFinish = (values) => {
        const start = values.startDistance;
        const end = values.endDistance;
        const interval = values.interval;

        const length = Math.ceil((end - start) / interval) + 1;
        const distanceArray = Array.from({ length }, (_, index) => start + index * interval);

        setDistance(distanceArray);
        setStandardWave(values.standardWave);
    }

    return (
        <div>
            {standardWave ? (
                <div>
                    <Collapse defaultActiveKey={['1']} items={items} />
                    <Button onClick={() => setStandardWave(null)}>{standardWave}</Button>
                </div>
            ) : (
                <Form form={form} onFinish={onFinish}>
                    <Row justify="center" gutter={[16, 16]}>
                        <Col span={6}>
                            <Title level={5} style={{ textAlign: 'left' }}>시작 거리</Title>
                            <Form.Item name="startDistance" rules={[{ required: true, message: 'Start Distance is required' }]}>
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Title level={5} style={{ textAlign: 'left' }}>종료 거리</Title>
                            <Form.Item name="endDistance" rules={[{ required: true, message: 'End Distance is required' }]}>
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                                <Title level={5} style={{ textAlign: 'left' }}>거리 간격</Title>
                                <Form.Item name="interval" rules={[{ required: true, message: 'Interval is required' }]}>
                                    <InputNumber style={{ width: '100%' }} />
                                </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Title level={5} style={{ textAlign: 'left' }}>진동 기준</Title>
                            <Form.Item name="standardWave" rules={[{ required: true, message: 'Start Distance is required' }]}>
                                <InputNumber style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{ textAlign: 'center' }}>
                            <Button type="link" htmlType="submit" block>계산</Button>
                        </Col>
                    </Row>
                </Form>
            )}
        </div>
    )
}

export default NomoGramChart;