
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Input, Form, Select, Radio, DatePicker, Row, Col } from 'antd';
import { Option } from 'antd/es/mentions';

const API_URL = process.env.REACT_APP_API_URL;
const { TextArea } = Input;

const AssetCreateModal = ({open, onOk, onCancel, locations, products }) => {
    const [form] = Form.useForm();
    const [isLocationDisabled, setIsLocationDisabled] = useState(false);

    const handleStateChange = (value) => {
        if (value === false) {
            setIsLocationDisabled(true);
            form.setFieldsValue({ location_id: 8 });
            form.setFieldsValue({ rent_state: false });
        } else {
            setIsLocationDisabled(false);
            form.setFieldsValue({ location_id: null });
            form.setFieldsValue({ rent_state: false });
        }
    };

    const handleSubmit = () => {
        form
            .validateFields()
            .then(values => {
                // moment 객체를 문자열로 변환
                const formattedValues = {
                    ...values,
                    start_date: values.start_date ? values.start_date.format('YYYY-MM-DD') : null,
                    end_date: values.end_date ? values.end_date.format('YYYY-MM-DD') : null,
                    marks: values.marks || null,

                };
                form.resetFields();
                onOk(formattedValues);
            })
            .catch(info => {
                console.log('Validate Failed:', info);
            });
    };

    return (
        <Modal
            title="추가"
            open={open}
            onOk={handleSubmit}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}>

            <Form form={form} layout="vertical">
                <Form.Item name="product_id" label="기기 종류" rules={[{ required: true, message: '제조회사를 입력해주세요!'}]}>
                <Select placeholder="Select a brand" >
                        {products.map(product => (
                            <Option key={product.product_id} value={product.product_id}>{product.product_name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="asset_name" label="기기번호" rules={[{ required: true, message: '계측기 시리얼번호를 입력해주세요!'}]}>
                    <Input />
                </Form.Item>

                <Form.Item name="state" label="사용 여부" rules={[{ required: true, message: '사용 현황을 입력해주세요!'}]}>
                    <Select placeholder="Select a state" onChange={handleStateChange}>
                        <Option value={true}>사용</Option>
                        <Option value={false}>미사용</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="location_id" label="현장이름" rules={[{ required: true, message: '현장을 입력해주세요!' }]}>
                    <Select 
                        placeholder="Select a location" 
                        disabled={isLocationDisabled} 
                    >
                        {locations.map(location => (
                            <Option key={location.location_id} value={location.location_id}>{location.location_name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="start_date" label="교정일">
                            <DatePicker format='YYYY-MM-DD' />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="end_date" label="차기교정일">
                            <DatePicker format='YYYY-MM-DD' />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="rent_state" label="임대 여부" >
                            <Radio.Group buttonStyle="solid" disabled={isLocationDisabled}>
                                <Radio.Button value={true}>임대</Radio.Button>
                                <Radio.Button value={false}>비임대</Radio.Button>
                            </Radio.Group>
                        </Form.Item> 
                    </Col>
                </Row>

                <Form.Item name="marks" label="비고">
                    <TextArea rows={4} placeholder='비고를 작성해주세요'/>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default AssetCreateModal;