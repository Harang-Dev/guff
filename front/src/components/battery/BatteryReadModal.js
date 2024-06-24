
import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { Modal, Button, Input, Form, Select, Radio, DatePicker, Row, Col } from 'antd';

const BatteryReadModal = ({open, onCancel, selectItem }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (selectItem) {
            form.setFieldsValue({
                ...selectItem,
                due_date: selectItem.due_date ? dayjs(selectItem.due_date) : null,
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
                <Form.Item name="folder_id" label="순번">
                    <Input disabled />
                </Form.Item>

                <Form.Item name="product_name" label="기기 종류" rules={[{ required: true, message: '기기종류를 선택해주세요!'}]}>
                    <Input disabled/>
                </Form.Item>

                <Form.Item name="state" label="사용 여부" rules={[{ required: true, message: '배터리 사용여부를 선택해주세요!'}]}>
                    <Input disabled/>
                </Form.Item>

                <Form.Item name="location_name" label="현장이름" rules={[{ required: true, message: '현장을 입력해주세요!' }]}>
                    <Input disabled/>
                </Form.Item>

                <Form.Item name="folder_name" label="폴더 이름" rules={[{ required: true, message: '폴더명을 입력해주세요!' }]}>
                    <Input disabled/>
                </Form.Item>

                <Form.Item name="due_date" label="교체일">
                    <DatePicker disabled/>
                </Form.Item>

                <Form.Item name="marks" label="비고">
                    <Input disabled/>
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default BatteryReadModal;