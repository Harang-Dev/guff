import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Input, Form, DatePicker, Select } from 'antd';
import { Option } from 'antd/es/mentions';

const API_URL = process.env.REACT_APP_API_URL;
const { TextArea } = Input;

const BatteryCreateModal = ({open, onOk, onCancel }) => {
    const [form] = Form.useForm();
    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);
    const [isLocationDisabled, setIsLocationDisabled] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`http://${API_URL}:8000/product/`);
                setProducts(response.data);
            } catch(error) {
                console.error('Error fetching products: ', error);
            }
        };
    
        const fetchLocations = async () => {
            try {
                const response = await axios.get(`http://${API_URL}:8000/location/`);
                setLocations(response.data);
            } catch(error) {
                console.error('Error fetching locations: ', error);
            }
        };
    
        fetchProducts();
        fetchLocations();
    }, []);

    const handleStateChange = (value) => {
        if (value === false) {
            setIsLocationDisabled(true);
            form.setFieldsValue({ location_name: "사무실" });
        } else {
            setIsLocationDisabled(false);
            form.setFieldsValue({ location_name: null });
        }
    };

    const handleSubmit = () => {
        form
            .validateFields()
            .then(values => {
                // moment 객체를 문자열로 변환
                const formattedValues = {
                    ...values,
                    due_date: values.due_date ? values.due_date.format('YYYY-MM-DD') : null,
                    folder_name: values.folder_name || null,
                    marks: values.marks || null,
                };

                // const payload = Object.fromEntries(
                //     Object.entries(formattedValues).map(([key, value]) => [key, value || null])
                // );

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
                <Form.Item name="product_name" label="기기 종류" rules={[{ required: true, message: '기기종류를 선택해주세요!'}]}>
                    <Select placeholder="Select a product">
                        {products.map(product => (
                            <Option key={product.product_name} value={product.product_name}>{product.product_name} ({product.brand_name})</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="state" label="사용 여부" rules={[{ required: true, message: '배터리 사용여부를 선택해주세요!'}]}>
                    <Select placeholder="Select a state" onChange={handleStateChange}>
                        <Option value={true}>Y</Option>
                        <Option value={false}>N</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="location_name" label="현장이름" rules={[{ required: true, message: '현장을 입력해주세요!' }]}>
                    <Select placeholder="Select a location" disabled={isLocationDisabled}>
                        {locations.map(location => (
                            <Option key={location.location_name} value={location.location_name}>{location.location_name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="folder_name" label="폴더 이름" >
                    <Input placeholder='Input folder name' disabled={isLocationDisabled}/>
                </Form.Item>

                <Form.Item name="due_date" label="교체일">
                    <DatePicker format='YYYY-MM-DD' disabled={isLocationDisabled}/>
                </Form.Item>

                <Form.Item name="marks" label="비고">
                    <TextArea rows={4} placeholder='비고를 작성해주세요'/>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default BatteryCreateModal;