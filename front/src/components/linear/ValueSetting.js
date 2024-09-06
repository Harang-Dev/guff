import React, { useState } from 'react';
import { Form, Row, Col, Button, InputNumber, Checkbox, Typography, Input } from 'antd';

const { Title } = Typography;

const ValueSetting = ({ tabValue, activeKey, onSave }) => {
    const [form] = Form.useForm();
    const [checkedState, setCheckedState] = useState({
            delay: true,
            metrics: true,
            otherFields: true,
    });

    // 체크박스를 제어하는 함수
    const handleCheckboxChange = (item, checked) => {
        setCheckedState(prevState => ({
            ...prevState,
            [item]: checked
        }));
    };

    const onFinish = (values) => {
        console.log(values)
        const filteredValues = Object.keys(values).reduce((acc, key) => {
            const value = key === 'delay' ? values[key].split(',').map(num => parseFloat(num.trim())) : values[key]
            console.log(value)
            if (checkedState[key]) {
                acc[key] = value;
            }

            return acc;
        });

        console.log(filteredValues);
        onSave(filteredValues, activeKey); // 부모 컴포넌트로 전달
    };

    const formFactory = (...rest) => {
        return (
            <Form form={form} onFinish={onFinish}>
                <Row justify="center" gutter={[16, 16]}>
                    {rest.flat().map((item, index) => (
                        <Col span={6} key={index}>
                            <Checkbox  checked={checkedState[item]} onChange={(e) => handleCheckboxChange(item, e.target.checked)} style={{ marginBottom: '10px' }}>
                                {item.toUpperCase()}
                            </Checkbox>
                            <Form.Item name={item}>
                                {
                                    item === ('delay' || 'metrics') ? 
                                    (
                                        <Input style={{ width: '100%' }} disabled={!checkedState[item]} placeHolder="0.2,0.3,0.4 등 으로 작성"/>
                                    ) : 
                                    (
                                        <InputNumber style={{ width: '100%' }} disabled={!checkedState[item]} />
                                    )
                                }
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