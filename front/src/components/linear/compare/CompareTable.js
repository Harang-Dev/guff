import React, { useState } from 'react';
import { Table } from 'antd';

const CompareTable = ({ type, expandRowData }) => {    
    const columns = [
        { title: '관리기준', dataIndex: 'standard', key: 'standard'},
        { title: '미진동', dataIndex: 'vibrationFree', key: 'vibrationFree' },
        { title: '정밀', dataIndex: 'precision', key: 'precision' },
        { title: '소규모', dataIndex: 'smallScale', key: 'smallScale' },
        { title: '중규모', dataIndex: 'mediumScale', key: 'mediumScale' },
        { title: '일반', dataIndex: 'general', key: 'general' },
        { title: '대규모', dataIndex: 'largeScale', key: 'largeScale' },
    ];

    const data = expandRowData.filter(item => item.type === type)
    console.log(data)

    return <Table bordered tableLayout="auto" columns={columns} dataSource={data} pagination={false} />;
};

export default CompareTable;