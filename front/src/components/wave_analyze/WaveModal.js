import React, { useState } from 'react';
import { Modal, Button, message, Select, Input, Table, Space  } from 'antd';
import axios from 'axios';
import EditableTable from './EditableTable';

const { Option } = Select;
const API_URL = process.env.REACT_APP_API_URL;

const WaveModal = ({open, onCancel, item}) => {
    const [resetKey, setResetKey] = useState(0);

    return (
        <Modal
            title="통계 요약"
            open={open}
            onCancel={onCancel}
            footer={[
                <Space />
            ]}
            width={'50%'}
        >
            <EditableTable resetKey={resetKey}/>
        </Modal>
    );
};

export default WaveModal;