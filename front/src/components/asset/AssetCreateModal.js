
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Modal, Button, Input, Form, Select, Radio, DatePicker, Row, Col } from 'antd';
import { Option } from 'antd/es/mentions';

const { TextArea } = Input;

const AssetCreateModal = ({open, onOk, onCancel }) => {
    const [form] = Form.useForm();
    const [brands, setBrands] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLocationDisabled, setIsLocationDisabled] = useState(false);

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/brand/');
                setBrands(response.data);
            } catch(error) {
                console.error('Error fetching brands: ', error);
            }
        };
    
        const fetchLocations = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/location/');
                setLocations(response.data);
            } catch(error) {
                console.error('Error fetching locations: ', error);
            }
        };
    
        fetchBrands();
        fetchLocations();
    }, []);

    const handleStateChange = (value) => {
        if (value === "N") {
            setIsLocationDisabled(true);
            form.setFieldsValue({ location_name: "사무실" });
            form.setFieldsValue({ rent_state: false });
        } else {
            setIsLocationDisabled(false);
            form.setFieldsValue({ location_name: null });
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
            title="수정"
            open={open}
            onOk={handleSubmit}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}>

            <Form form={form} layout="vertical">
                <Form.Item name="asset_id" label="Asset ID">
                    <Input disabled />
                </Form.Item>

                <Form.Item name="brand_name" label="제조회사" rules={[{ required: true, message: '제조회사를 입력해주세요!'}]}>
                    <Select placeholder="Select a brand">
                        {brands.map(brand => (
                            <Option key={brand.brand_name} value={brand.brand_name}>{brand.brand_name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="asset_name" label="기기번호" rules={[{ required: true, message: '계측기 시리얼번호를 입력해주세요!'}]}>
                    <Input />
                </Form.Item>

                <Form.Item name="state" label="State" rules={[{ required: true, message: '사용 현황을 입력해주세요!'}]}>
                    <Select placeholder="Select a state" onChange={handleStateChange}>
                        <Option value="Y">Y</Option>
                        <Option value="N">N</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="location_name" label="현장이름" rules={[{ required: true, message: '현장을 입력해주세요!' }]}>
                    <Select placeholder="Select a location" disabled={isLocationDisabled}>
                        {locations.map(location => (
                            <Option key={location.location_name} value={location.location_name}>{location.location_name}</Option>
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