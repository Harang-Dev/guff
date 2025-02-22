import React, { useState } from 'react';
import { Modal, Input, Form, DatePicker, Select, InputNumber, Col, Row } from 'antd';
import { Option } from 'antd/es/mentions';

const API_URL = process.env.REACT_APP_API_URL;
const { TextArea } = Input;

const BatteryCreateModal = ({open, onOk, onCancel, locations, products }) => {
    const [form] = Form.useForm();
    const [isLocationDisabled, setIsLocationDisabled] = useState(false);

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
                <Form.Item name="folder_id" label="순번">
                    <Input disabled />
                </Form.Item>

                <Form.Item name="product_id" label="기기 종류" rules={[{ required: true, message: '기기종류를 선택해주세요!'}]}>
                    <Select placeholder="기기 종류를 선택해주세요" >
                        {products.map(product => (
                            <Option key={product.product_id} value={product.product_id}>{product.product_name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="state" label="사용 여부" rules={[{ required: true, message: '배터리 사용여부를 선택해주세요!'}]}>
                    <Select placeholder="사용 여부를 선택해주세요" onChange={handleStateChange}>
                        <Option value={true}>Y</Option>
                        <Option value={false}>N</Option>
                    </Select>
                </Form.Item>

                <Form.Item name="location_id" label="현장 이름" rules={[{ required: true, message: '현장을 입력해주세요!' }]}>
                    <Select 
                        placeholder="현장을 선택해주세요" 
                        disabled={isLocationDisabled}   
                    >
                        {locations.map(location => (
                            <Option key={location.location_id} value={location.location_id}>{location.location_name}</Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item name="folder_name" label="폴더 이름">
                    <Input placeholder='폴더 이름을 입력해주세요' disabled={isLocationDisabled}/>
                </Form.Item>

                <Row>
                    <Col span={12}>
                        <Form.Item name="replace_cycle" label="교체 주기">
                            <InputNumber style={{ width: '80%'}} placeholder='교체 주기를 입력해주세요' disabled={isLocationDisabled}/>
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item name="due_date" label="교체일">
                            <DatePicker style={{ width: '80%'}} format='YYYY-MM-DD' disabled={isLocationDisabled}/>
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

export default BatteryCreateModal;