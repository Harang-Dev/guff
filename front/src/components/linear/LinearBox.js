import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Button, Form, Spin } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;
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
            navigate('/linear/success', { state : { filename: response.data }});
        } catch (error) {
            console.error('uploda error: ', error);
            message.error('Upload Failed');
        } finally {
            setLoading(false);
        }
    }

    const downloadForm = async () => {
        try {
            const response = await axios.get(`${API_URL}/linear/file-form`, {
                responseType: 'blob',  // 파일 다운로드의 경우 blob 사용
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', `회귀분석_데이터폼.xlsx`);

            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch (error) {
            message.error('데이터 양식 다운로드 실패')
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

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type='link' size='small'>양식 다운로드</Button>
                    </div>
                </Spin>
            :
                <>
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

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button type='link' size='small' onClick={downloadForm}>양식 다운로드</Button>
                    </div>
                </>
            }
        </div>
    );
}

export default LinearBox;
