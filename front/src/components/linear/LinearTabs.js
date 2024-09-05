import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Space, Tabs, Row, Col, Divider, Card, Table, Modal, Input} from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import RegressionChart from './RegressionChart';
import EditableTable from '../layout/EditableTable';
import WieghtPerDelayChart from './WeightPerDelayChart';
import NomoGramChart from './nomogram/NomoGramChart';
import CompareTab from './compare/CompareTab';

const API_URL = process.env.REACT_APP_API_URL;

const LinearTabs = () => {
    const location = useLocation();
    const { filename } = location.state || {};

    const [tabPanes, setTabPanes] = useState([]);
    const [activeKey, setActiveKey] = useState(0);
    const [chartData, setChartData] = useState(null);

    const [tabValue, setTabValue] = useState({
        weight: [],
        nomogram: [],
        compare: [],
    })


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
                            filename={filename}
                            delayColumn={delayColumn}
                        />
                    </div>
                )
            }

            const nomogramChart = {
                key: '2',
                label: 'Nomogram 그래프',
                children: (
                    <div>
                        <NomoGramChart
                            filename={filename}
                        />
                    </div>
                )
            }

            const testChart = {
                key: '3',
                label: '국토부 선행호기 영역 비교',
                children: (
                    <div>
                        <CompareTab
                            filename={filename}
                        />
                    </div>
                )
            }
            setTabPanes([initialTab, weightPerDelayTab, nomogramChart, testChart]);
            setActiveKey('0');
        }
    }, [chartData])

    return (
        <div>
            <Tabs
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                items={tabPanes}
                tabBarExtraContent={
                    <Button type="link">설정</Button>
                }
            />
        </div>
    )
}

export default LinearTabs;