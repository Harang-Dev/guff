import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { Space, Table, message, Button } from 'antd';

import { simpleColumns, properColumns, complicatedColumns } from './AnalyzeColumns';
import AnalyzeStatisticsModal from './AnalyzeStatisticsModal';
import * as XLSX from 'xlsx';
import ReactDOMServer from 'react-dom/server'


const API_URL = process.env.REACT_APP_API_URL;

function AnalyzeResult(props) {
    const location = useLocation();
    const { version , filename } = location.state || {};
    const [ data, setData ] = useState([]);
    const [ statisticsData, setStatisticsData ] = useState([]);
    const [ locData, setLocData ] = useState([]);
    const [ statisticsModalVisible, setStatisticsModalVisible ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/parser/${filename}`);
                setData(response.data);
            } catch (error) {
                message.error('한글 데이터 불러오기 실패');
            }
        };

        const fetchLocData = async () => {
            try {
                const response = await axios.get(`${API_URL}/parser/${filename}/locations`);
                setLocData(response.data);
            } catch (error) {
                message.error('위치 데이터 불러오기 실패');
            }
        };

        fetchData();
        fetchLocData();
    }, [version]); // version이 변경될 때만 실행


    const showStatisticsModal = () => {
        const statistics = async () => {
            try {
                const response = await axios.get(`${API_URL}/parser/${filename}/statistics`);
                setStatisticsData(response.data);
                console.log(response.data);
            } catch(error) {
                message.error('통계 조회 실패');
            }
        };

        statistics();
        setStatisticsModalVisible(true);
    };

    const handleStatisticsModalCancel = () => {
        setStatisticsModalVisible(false);
    }

    const download = async () => {
        try {
            const response = await axios.get(`${API_URL}/parser/${filename}/download/${version}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', `${filename}.xlsx`);

            document.body.appendChild(link);
            link.click();

            window.URL.revokeObjectURL(url);
            document.body.removeChild(link);
        } catch(error) {
            message.error('엑셀 다운로드 실패');
        }
    }

    const selectColumn = () => {
        switch (version) {
            case "간단이":
                return simpleColumns(locData);
            case "어중이떠중이":
                return properColumns(locData);
            case "복잡이":
                return complicatedColumns(locData);;
        }
    };

    return (
        <div>
            <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button type="primary" icon={<PlusOutlined />} onClick={showStatisticsModal} style={{marginBottom: 10}}>통계 조회</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={download} style={{marginBottom: 10}} >다운로드</Button>
            </Space>

            <Table
                bordered
                columns={selectColumn()}
                dataSource={data}
                pagination={false}
                scroll={{
                    y: 700,
                  }}
            />    
            <AnalyzeStatisticsModal
                open={statisticsModalVisible}
                onCancel={handleStatisticsModalCancel}
                item={statisticsData}
                version={version}
            />

        </div>
    );
};

export default AnalyzeResult;
