import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import { SearchOutlined, DownloadOutlined, PlusOutlined } from '@ant-design/icons';
import { Space, Table, message, Button, Pagination } from 'antd';

import { SimpleColumns, ProperColumns, ComplicatedColumns } from './AnalyzeColumns';
import AnalyzeStatisticsModal from './AnalyzeStatisticsModal';

const CenteredContainer = styled.div`
    margin: 0;
    padding: 0;
    display: grid;
    justify-content: center;
    align-items: center;
`;

function AnalyzeResult(props) {
    const location = useLocation();
    const { version, findText, data } = location.state || {};
    const [ sData, setData ] = useState([]);
    const [ locData, setLocData ] = useState([]);
    const [ statisticsModalVisible, setStatisticsModalVisible ] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/parser/${version}`);
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
                const response = await axios.post(`http://127.0.0.1:8000/parser/statistics/`, {
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
            const response = await axios.get(`http://127.0.0.1:8000/parser/download/${version}`, {
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
                return ProperColumns(locData);
            case "복잡이":
                return ComplicatedColumns(locData);
        }
    };


    return (
        <CenteredContainer>
            <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button type="primary" icon={<PlusOutlined />} onClick={showStatisticsModal} style={{marginBottom: 10}}>통계 조회</Button>
                <Button type="primary" icon={<PlusOutlined />} onClick={download} style={{marginBottom: 10}} >다운로드</Button>
            </Space>

            <Table
                columns={selectColumn()}
                dataSource={data}
            />
            <AnalyzeStatisticsModal
                open={statisticsModalVisible}
                onCancel={handleStatisticsModalCancel}
                item={sData}
            />
        </CenteredContainer>
    );
};

export default AnalyzeResult;
