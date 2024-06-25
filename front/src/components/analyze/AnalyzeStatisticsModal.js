
import React, { useState, useEffect } from 'react';
import { Modal, Button, message, Form, Descriptions, Divider } from 'antd';


const AnalyzeStatisticsModal = ({open, onCancel, item }) => {
    const [form] = Form.useForm();

    return (
        <Modal
            title="문서 통계"
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
            <Divider />
            {Object.keys(item).map((locName, index) => (
                <Descriptions title={locName} key={index} column={12}>
                    <Descriptions.Item span={12}>Min</Descriptions.Item>
                    {Object.keys(item[locName].Min).map((key) => (
                        item[locName].Min[key] == '-' ? null : <Descriptions.Item key={`MIN-${key}`} label={key} span={4}>{item[locName].Min[key]}</Descriptions.Item>
                    ))}
                    <Descriptions.Item span={12}>Max</Descriptions.Item>
                    {Object.keys(item[locName].Max).map((key) => (
                        item[locName].Max[key] == '-' ? null : <Descriptions.Item key={`Max-${key}`} label={key} span={4}>{item[locName].Max[key]}</Descriptions.Item>
                    ))}
                </Descriptions>

            ))}            
        </Modal>
    );
};

export default AnalyzeStatisticsModal;