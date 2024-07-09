import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { PlusOutlined } from '@ant-design/icons';
import { Space, Table, message, Button } from 'antd';

import { SimpleColumns, ProperColumns } from './AnalyzeColumns';
import AnalyzeStatisticsModal from './AnalyzeStatisticsModal';

const API_URL = process.env.REACT_APP_API_URL;

function AnalyzeResult(props) {
    const location = useLocation();
    const { version , data } = location.state || {};
    const [ sData, setData ] = useState([]);
    const [ locData, setLocData ] = useState([]);
    const [ statisticsModalVisible, setStatisticsModalVisible ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${API_URL}/parser/${version}`);
                setLocData(response.data);
            } catch (error) {
                message.error('위치 데이터 불러오기 실패');
            }
        };

        fetchData();
    }, [version]); // version이 변경될 때만 실행


    const showStatisticsModal = () => {
        const statistics = async () => {
            try {
                const response = await axios.post(`${API_URL}/parser/statistics/`, {
                    version: version,
                    location: locData,
                });
                setData(response.data);
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
            const response = await axios.get(`${API_URL}/parser/download/${version}`, {
                responseType: 'blob',
            });

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');

            link.href = url;
            link.setAttribute('download', 'test.xlsx');

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
                return SimpleColumns(locData);
            case "어중이떠중이":
                return ProperColumns({data, locData});
            case "복잡이":
                return ProperColumns({data, locData});;
        }
    };


    return (
        <div>
            <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button type="primary" icon={<PlusOutlined />} onClick={showStatisticsModal} style={{marginBottom: 10}}>통계 조회</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={download} style={{marginBottom: 10}} >다운로드</Button>
            </Space>

            <Table
                columns={selectColumn()}
                dataSource={data}
                pagination={{ pageSize: 50 }}
                scroll={{ y: 800 }}
            />
            <AnalyzeStatisticsModal
                open={statisticsModalVisible}
                onCancel={handleStatisticsModalCancel}
                item={sData}
                version={version}
            />
        </div>
    );
};

export default AnalyzeResult;
