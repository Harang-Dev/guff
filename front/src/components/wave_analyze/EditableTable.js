import React from 'react';
import { Table, Form, Popconfirm } from 'antd';
import { EditableCell, EditableRow } from './EditableComponents';

const EditableTable = ({ dataSource, onDelete, onSave }) => {
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
                <Popconfirm title={`선택한 행을 삭제하시겠습니까?`} onConfirm={() => onDelete(record.key)}>
                    <a>Delete</a>
                </Popconfirm>
            ) : null,
        },
    ];

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
                handleSave: onSave,
            }),
        };
    });

    return (
        <>
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
