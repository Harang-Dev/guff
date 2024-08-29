import React from 'react';
import { Table, Form } from 'antd';
import { EditableCell, EditableRow } from './EditableComponents';

const EditableTable = ({ columns, dataSource, onSave }) => {
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
