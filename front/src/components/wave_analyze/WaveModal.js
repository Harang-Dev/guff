import React, { useState } from 'react';
import { Modal, Button, message, Input, Table, Space  } from 'antd';
import axios from 'axios';
import EditableTable from './EditableTable';
import { useLocation } from 'react-router-dom';

const API_URL = process.env.REACT_APP_API_URL;

const WaveModal = ({open, onCancel, onCalc}) => {
    const location = useLocation();
    const { filename } = location.state || {};
    const [dataSource, setDataSource] = useState([]);
    const [count, setCount] = useState(0);

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

                const mapData = mokData.map((items, index) => ({
                    ...dataSource[index],
                    tm: Math.max(...items.map(item => item.tm)),
                    vm: Math.max(...items.map(item => item.vm)),
                    lm: Math.max(...items.map(item => item.lm)),
                    ppv: Math.max(...items.map(item => item.ppv)),
                }))

                onCalc(response.data, dataSource.map(item => item.type), mapData);
                setDataSource(mapData);
            }
        } catch (error) {
            message.error('도표 분석 실패!');
            console.log(error);
        }
    }

    return (
        <Modal
            title="통계 요약"
            open={open}
            onCancel={() => {
                setDataSource([]);
                setCount(0);
                onCancel();
            }}
            footer={[
                <Space />
            ]}
            width={'50%'}
        >
            <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button onClick={handleAdd} style={{marginBottom: 10}}>행 추가</Button>
                <Button onClick={handleCalc} style={{marginBottom: 10}}>계산하기</Button>
            </Space>

            <EditableTable 
                dataSource={dataSource}
                onDelete={handleDelete}
                onSave={handleSave}
            />
        </Modal>
    );
};

export default WaveModal;