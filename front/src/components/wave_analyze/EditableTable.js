import React, { useState, useEffect } from 'react';
import { Table, Input, Form, Button, message } from 'antd';
import { EditableCell, EditableRow } from './EditableComponents';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const EditableTable = (resetKey) => {
    const location = useLocation();
    const { filename } = location.state || {};
    const [dataSource, setDataSource] = useState([]);
    const [prevTime, setPrevTime] = useState(null);

    useEffect(() => {
        setDataSource([]);
        setPrevTime(null);
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
            title: 'Operation',
            dataIndex: 'operation',
            render: (_, record) =>
            dataSource.length >= 1 ? (
                <Button onClick={() => handleCalc(record.time)}>계산하기</Button>
            ) : null,
        },
    ];

    const handleCalc = async (time) => {
        try{
            const response = await axios.get(`${API_URL}/wave/${filename}/calc?time=${time}${prevTime ? `&prevTime=${prevTime}` : ''}`)
            console.log(response.data, prevTime)
            setPrevTime(time)
        }
        catch (error) {
            message.error('파형 데이터 불러오기 실패')
        }
    } 

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
            key: '-',
            time: '-',
            tm: '-',
            vm: '-',
            lm: '-',
            ppv: '-'
        };
        setDataSource([...dataSource, newData]);
    };

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
            <Button onClick={handleAdd} type="primary" style={{ marginBottom: 16 }}>
                Add a row
            </Button>
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
