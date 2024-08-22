import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Space, Tabs, Row, Col, Divider, Card } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import RegressionChart from './RegressionChart';

const API_URL = process.env.REACT_APP_API_URL;

const LinearTabs = () => {
    const location = useLocation();
    const { filename } = location.state || {};

    const [tabPanes, setTabPanes] = useState([]);
    const [activeKey, setActiveKey] = useState(0);
    const [chartData, setChartData] = useState(null);
    
    useEffect(() => {
        const fetchData = async() => {
            try {
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
                lable: '회귀 분석 그래프',
                children: (
                    <div>
                        <RegressionChart chartData={chartData} />
                    </div>
                ),
            }
            
            const tt = {
                key: '1',
                lable: '일단 테스트용',
                children: (
                    <div>
                        뿡빵삥뽕
                    </div>
                )
            }
            setTabPanes([initialTab, tt]);
            setActiveKey('0');
        }
    }, [chartData])

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