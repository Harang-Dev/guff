import React, { useState, useEffect } from 'react';
import { Table, Input, Form, Button, Popconfirm, Space, message } from 'antd';
import { EditableCell, EditableRow } from './EditableComponents';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const EditableTable = (resetKey) => {
    const location = useLocation();
    const { filename } = location.state || {};
    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(0);

    useEffect(() => {
        setDataSource([]);
        setCount(0);
    }, [resetKey])

    const columns = [
        {
            title: 'Type',
            dataIndex: 'type',
            editable: true,
        },
        {
            title: 'Time',
            dataIndex: 'time',
            editable: true,
        },
        {
            title: 'TM',
            dataIndex: 'tm',
        },
        {
            title: 'VM',
            dataIndex: 'vm',
        },
        {
            title: 'LM',
            dataIndex: 'lm',
        },
        {
            title: 'PPV',
            dataIndex: 'ppv',
        },
        {
            title: 'Delete',
            dataIndex: 'delete',
            render: (_, record) =>
            dataSource.length >= 1 ? (
                <Popconfirm title={`선택한 행을 삭제하시겠습니까?`} onConfirm={() => handleDelete(record.key)}>
                    <a>Delete</a>
                </Popconfirm>
            ) : null,
        },
    ];

    const handleDelete = (key) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const handleSave = (row) => {
        const newData = [...dataSource];
        const index = newData.findIndex((item) => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });

        setDataSource(newData);
    };

    const handleAdd = () => {
        const newData = {
            key: count,
            type: '-',
            time: '-',
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    const handleCalc = async () => {
        try {
            if (dataSource.length > 0) {
                const response = await axios.post(`${API_URL}/wave/${filename}/calc`, dataSource)
                const mokData = Object.keys(response.data).map(key => response.data[key])

                setDataSource(
                    mokData.map((items, index) => ({
                        ...dataSource[index],
                        tm: Math.max(...items.map(item => item.tm)),
                        vm: Math.max(...items.map(item => item.vm)),
                        lm: Math.max(...items.map(item => item.lm)),
                        ppv: Math.max(...items.map(item => item.ppv)),
                    }))
                );
            }
        } catch (error) {
            message.error('도표 분석 실패!');
        }
    }

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
    }

    return {
        ...col,
        onCell: (record) => ({
            record,
            editable: col.editable,
            dataIndex: col.dataIndex,
            title: col.title,
            handleSave,
        }),
        };
    });

    return (
        <>
            <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={handleAdd} style={{marginBottom: 10}}>행 추가</Button>
                <Button onClick={handleCalc} style={{marginBottom: 10}}>계산하기</Button>
            </Space>
            <Form component={false}>
                <Table
                components={{
                    body: {
                    row: EditableRow,
                    cell: EditableCell,
                    },
                }}
                dataSource={dataSource}
                columns={mergedColumns}
                rowClassName="editable-row"
                pagination={false}
                />
            </Form>
        </>
    );
};

export default EditableTable;
