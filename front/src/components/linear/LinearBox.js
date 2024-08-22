import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Select, Form, Spin } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;
const { Option } = Select;
const { Dragger } = Upload;

function LinearBox(props) {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    
    const handleUpload = async (file) => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post(`${API_URL}/linear/`, formData , { headers: { 'Content-Type': '/multipart/form-data' }, });
            message.success('Upload Successful');
            console.log(response.data)
            navigate('/linear/success', { state : { filename: response.data }});
        } catch (error) {
            console.error('uploda error: ', error);
            message.error('Upload Failed');
        } finally {
            setLoading(false);
        }
    }

    const uploadProps = {
        name: 'file',
        multiple: false,
        beforeUpload: handleUpload,
    };

    return (
        <div>
            {loading ? 
                <Spin tip="Loading..." size='large'>
                    <Form>
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
                </Spin>
            :
                <Form>
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
            }
        </div>
    );
}

export default LinearBox;
