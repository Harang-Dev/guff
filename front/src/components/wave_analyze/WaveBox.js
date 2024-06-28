import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Select, Form, } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;
const { Option } = Select;
const { Dragger } = Upload;

function WaveBox(props) {
    const [version, setVersion] = useState(null);
    const [filename, setFileName] = useState(null);
    const navigate = useNavigate();
    
    const handleUpload = async (file) => {
        if (!version) {
            message.error('버전을 선택해주세요.');
            return Upload.LIST_IGNORE;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('version', version);
        setFileName(file.name);

        try {
            const response = await axios.post(`http://${API_URL}:8000/wave/`, formData , { headers: { 'Content-Type': '/multipart/form-data' }, });
            console.log('upload successful: ',  response.data);
            message.success('Upload Successful');

            navigate('/wave-analyze/success', { state: { version, filename, data: response.data }});
        } catch (error) {
            console.error('uploda error: ', error);
            message.error('Upload Failed');
        }
    }

    const uploadProps = {
        name: 'file',
        multiple: false,
        beforeUpload: handleUpload,
    };

    // CenteredContainer를 지우면 반응형으로 잘 동작함! 사이즈 줄이면 잘 반응함
    // 근데 있으면 왜 반응하지 못하지? 병123신인가봐 ㅠㅠ
    return (
        <div>
            <Form>
                <Form.Item label="버전" >
                    <Select placeholder="Select Version" onChange={setVersion}>
                        <Option value="HB">HB</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Dragger {...uploadProps}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">파일을 선택 혹은 드래그로 추가해주세요</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload.</p>
                    </Dragger>
                </Form.Item>
            </Form>
        </div>
    );
}

export default WaveBox;
