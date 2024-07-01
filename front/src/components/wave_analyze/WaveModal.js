import React from 'react';
import { Modal, Button, message } from 'antd';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const WaveModal = ({open, onCancel, item}) => {

    const test = async () => {
        try{
            const response = await axios.get(`http://${API_URL}:8000/wave/${item}/-0.24`);
            console.log(response.data);
        } catch(error) {
            message.error("Parsing Error");
        }
    }

    return (
        <Modal
            title="통계 요약"
            open={open}
            onCancel={() => {
                onCancel();
            }}
            footer={[
                <Button key="OK" type='primary' onClick={() => {
                    onCancel();
                }}>
                OK
                </Button>
            ]}
        >
            <Table></Table>
            <Button onClick={test}></Button>
        </Modal>
    );
};

export default WaveModal;