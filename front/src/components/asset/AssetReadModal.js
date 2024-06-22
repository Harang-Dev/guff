import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import axios from 'axios';
import { Modal, Input, Form, Radio, DatePicker, Button, Row, Col } from 'antd';

const { TextArea } = Input;

const AssetReadModal = ({open, onCancel, selectItem }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectItem) {
            form.setFieldsValue({
                ...selectItem,
                start_date: selectItem.start_date ? dayjs(selectItem.start_date) : null,
                end_date: selectItem.end_date ? dayjs(selectItem.end_date) : null,
            });
        }
    }, [selectItem, form]);

    return (
        <Modal
            title="조회"
            open={open}
            onCancel={() => {
                form.resetFields();
                onCancel();
            }}
            footer={[
                <Button key="OK" type='primary' onClick={() => {
                    form.resetFields();
                    onCancel();
                }}>
                OK
                </Button>
            ]}
            >

            <Form form={form} layout="vertical">
                <Form.Item name="asset_id" label="Asset ID">
                    <Input disabled />
                </Form.Item>

                <Form.Item name="brand_name" label="제조회사" >
                    <Input disabled />
                </Form.Item>

                <Form.Item name="asset_name" label="기기번호" >
                    <Input disabled />
                </Form.Item>

                <Form.Item name="state" label="State" >
                    <Input disabled />
                </Form.Item>

                <Form.Item name="location_name" label="현장이름" r>
                    <Input disabled />
                </Form.Item>

                <Row gutter={16}>
                    <Col span={8}>
                        <Form.Item name="start_date" label="교정일">
                            <DatePicker format='YYYY-MM-DD' disabled />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="end_date" label="차기교정일">
                            <DatePicker format='YYYY-MM-DD' disabled />
                        </Form.Item>
                    </Col>

                    <Col span={8}>
                        <Form.Item name="rent_state" label="임대 여부" >
                            <Radio.Group buttonStyle="solid" disabled >
                                <Radio.Button value={true}>임대</Radio.Button>
                                <Radio.Button value={false}>비임대</Radio.Button>
                            </Radio.Group>
                       </Form.Item> 
                    </Col>
                </Row>

                <Form.Item name="marks" label="비고">
                    <TextArea rows={4} disabled />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default AssetReadModal;