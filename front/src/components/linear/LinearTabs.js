import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Space, Tabs, Row, Col, Divider, Card, Table } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import RegressionChart from './RegressionChart';
import EditableTable from '../layout/EditableTable';
import WieghtPerDelayChart from './WeightPerDelayChart';

const API_URL = process.env.REACT_APP_API_URL;

const LinearTabs = () => {
    const location = useLocation();
    const { filename } = location.state || {};

    const [tabPanes, setTabPanes] = useState([]);
    const [activeKey, setActiveKey] = useState(0);
    const [chartData, setChartData] = useState(null);

    const [dataSource, setDataSource] = useState([]);
    
    useEffect(() => {
        const fetchData = async() => {
            try {
                console.log(filename)
                const response = await axios.get(`${API_URL}/linear/linregress/${filename}`)
                setChartData(response.data);
            } catch(error) {
                console.log(error)
            }
        }
        
        fetchData();
    }, [filename]);

    useEffect(() => {
        if(chartData) {
            const initialTab = {
                key: '0',
                label: '전체 그래프',
                children: (
                    <div className='TabsChild'>
                        <RegressionChart chartData={chartData} style={{marginTop: 100}}/>
                    </div>
                ),
            }
            
            const weightPerDelayTab = {
                key: '1',
                label: '진동 기준에 따른 이격거리별 최대 허용 지발당 장약량 (kg/delay)',
                children: (
                    <div>
                        <WieghtPerDelayChart 
                            columns={columns} 
                            dataSource={dataSource} 
                            onSave={handleSave}
                            filename={filename}
                        />
                    </div>
                )
            }
            setTabPanes([initialTab, weightPerDelayTab]);
            setActiveKey('0');
        }
    }, [chartData])

    const columns = [
        {
            title: 'Distance (m)',
            dataIndex: 'distance',
        },
        {
            title: '진동 기준에 따른 이격거리별 최대 허용 지발당 장약량',
            dataIndex: 'kg',
            children: [
                {
                    title: '-',
                    dataIndex: 'kg1',
                    editable: true,
                },
                {
                    title: '-',
                    dataIndex: 'kg2',
                    editable: true,
                },
                {
                    title: '-',
                    dataIndex: 'kg3',
                    editable: true,
                },
                {
                    title: '-',
                    dataIndex: 'kg4',
                    editable: true,
                },
                {
                    title: '-',
                    dataIndex: 'kg5',
                    editable: true,
                },
            ],
        },
    ]

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

    return (
        <div>
            <Tabs
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                items={tabPanes}
            />
        </div>
    )
}

export default LinearTabs;