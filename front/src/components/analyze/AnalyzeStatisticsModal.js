
import React, { useState, useEffect } from 'react';
import { Modal, Button, message, Form, Descriptions, Divider } from 'antd';


const AnalyzeStatisticsModal = ({open, onCancel, item, version }) => {
    const [form] = Form.useForm();
    const blastColumn = [ 'cm/s', 'dB' ];

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
                <Descriptions title={locName} key={index} column={version === '간단이' ? 2 : 12}>
                    <Descriptions.Item span={version === '간단이' ? 2 : 12}>Min</Descriptions.Item>
                    {Object.keys(item[locName].Min).map((key) => (
                        blastColumn.some(keyword => key.includes(keyword)) ? <Descriptions.Item key={`MIN-${key}`} label={key} span={version === '간단이' ? 1 : 4}>{item[locName].Min[key]}</Descriptions.Item> : null
                    ))}
                    <Descriptions.Item span={version === '간단이' ? 2 : 12}>Max</Descriptions.Item>
                    {Object.keys(item[locName].Max).map((key) => (
                        blastColumn.some(keyword => key.includes(keyword)) ? <Descriptions.Item key={`Max-${key}`} label={key} span={version === '간단이' ? 1 : 4}>{item[locName].Max[key]}</Descriptions.Item> : null
                    ))}
                </Descriptions>

            ))}            
        </Modal>
    );
};

export default AnalyzeStatisticsModal;