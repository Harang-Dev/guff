import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload, Select, Form, } from 'antd';

const { Option } = Select;
const { Dragger } = Upload;

const CenteredContainer = styled.div`
    width: 100%;
    min-height: 100vh;
    display: grid;
    justify-content: center;
    align-items: center;
`;

function AnalyzeBox(props) {
    const [version, setVersion] = useState(null);
    const [findText, setFindText] = useState(null);
    const navigate = useNavigate();
    
    const handleUpload = async (file) => {
        if (!version || !findText) {
            message.error('버전과 찾을 문자열을 선택해주세요.');
            return Upload.LIST_IGNORE;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('version', version);
        formData.append('search_text', findText);

        try {
            const response = await axios.post('http://127.0.0.1:8000/parser/', formData , { headers: { 'Content-Type': '/multipart/form-data' }, });
            console.log('upload successful: ',  response.data);
            message.success('Upload Successful');

            navigate('/analyze/success', { state: { version, findText, data: response.data }});
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
                        <Option value="간단이">간단이</Option>
                        <Option value="복잡이">복잡이</Option>
                        <Option value="어중이떠중이">어중이떠중이</Option>
                    </Select>
                </Form.Item>

                <Form.Item label="찾을 문자열" >
                    <Select placeholder="Select Version" onChange={setFindText}>
                        <Option value="일자별 계측 현황">일자별 계측 현황</Option>
                        <Option value="일자별 발파 및 계측 현황">일자별 발파 및 계측 현황</Option>
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

export default AnalyzeBox;
