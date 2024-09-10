import React, { useState } from 'react';
import { Form, Row, Col, Button, InputNumber, Checkbox, Typography, Input } from 'antd';

const { Title } = Typography;

const ValueSetting = ({ tabValue, activeKey, onSave }) => {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        const tempValue = Object.keys(values).reduce((acc, key) => {
            const value = key === "delay" || key === "metrics" ? values[key].split(",").map(num => parseFloat(num.trim())).sort() : values[key]
            acc[key] = value;
            return acc;
        }, {});

        onSave(tempValue, activeKey); // 부모 컴포넌트로 전달
    };

    const formFactory = (...rest) => {
        return (
            <Form form={form} onFinish={onFinish}>
                <Row justify="center" gutter={[16, 16]}>
                    {rest.flat().map((item, index) => (
                        <Col span={8} key={index}>
                            <Title level={5} style={{ textAlign: 'left' }}>{item}</Title>
                            <Form.Item  name={item} rules={[{ required: true, message: `${item}을 입력해주세요`}]}>
                                {item === 'delay' || item === 'metrics' ? 
                                (
                                    <Input style={{ width: '100%'}} placeholder={'0.2, 0.3, ... 양식으로 입력해주세요'} /> 
                                ):
                                (
                                    <InputNumber style={{ width: '100%' }} />
                                )}
                            </Form.Item>
                        </Col>
                    ))}

                    <Col span={24} style={{ textAlign: 'center' }}>
                        <Button type="link" htmlType="submit">저장</Button>
                    </Col>
                </Row>
            </Form>
        );
    };


    return (
        <>
            {formFactory(Object.keys(tabValue[activeKey]))}
        </>
    );
};

export default ValueSetting;