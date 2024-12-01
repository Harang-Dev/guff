
import React, { useState, useEffect } from 'react';
import { Modal, Button, message, Form, Divider, Table } from 'antd';
import { complicatedStatisticsColumns, properStatisticsColumns, simpleStatisticsColumns } from './AnalyzeColumns';

const AnalyzeStatisticsModal = ({open, onCancel, item, version }) => {
    const [form] = Form.useForm();

    const selectColumn = () => {
        switch (version) {
            case "간단이":
                return simpleStatisticsColumns();
            case "어중이떠중이":
                return properStatisticsColumns();
            case "복잡이":
                return complicatedStatisticsColumns();;
        }
    };

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
            width="100%"
            >
            <Divider />
            <Table
                bordered
                columns={selectColumn()}
                dataSource={item}
                pagination={false}
                scroll={{
                    y: 700
                }}
            />
        </Modal>
    );
};

export default AnalyzeStatisticsModal;