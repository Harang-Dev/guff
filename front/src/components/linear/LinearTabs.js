import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Tabs, message } from 'antd';
import axios from 'axios';
import RegressionChart from './RegressionChart';
import WieghtPerDelayChart from './WeightPerDelayChart';
import NomoGramChart from './nomogram/NomoGramChart';
import CompareTab from './compare/CompareTab';
import SettingModal from './SettingModal';

const API_URL = process.env.REACT_APP_API_URL;

const LinearTabs = () => {
    const location = useLocation();
    const { filename } = location.state || {};

    const [linearData, setLinearData] = useState(null);
    const [chartData, setChartData] = useState(null);

    const [activeKey, setActiveKey] = useState('main');
    const [showModal, setShowModal] = useState(false);
    const [tabPanes, setTabPanes] = useState(null);

    const [tabValue, setTabValue] = useState({
        weight: {
            start: 230,
            end: 630,
            interval: 10,
            delay: [0.02, 0.2, 0.254, 0.3, 0.5, 2.540]
        },
        nomogram: {
            start: 10,
            end: 300,
            interval: 10,
            standardWave: 0.5,
        },
        compare: {
            metrics: [0.02, 0.05, 0.07, 0.1, 0.15, 0.2, 0.3, 0.5, 1, 2, 3, 4, 5]
        },
    })

    useEffect(() => {
        const fetchCharData = async() => {
            try {
                const response = await axios.get(`${API_URL}/linear/linregress/${filename}`)
                setChartData(response.data);
            } catch(error) {
                message.error('그래프 데이터 조회 실패')
            }
        }

        const fetchLinearData = async() => {
            try {
                const response = await axios.get(`${API_URL}/linear/linregress/result/${filename}`);
                setLinearData(response.data);
            } catch(error) {
                message.error('선형회귀 데이터 조회 실패')
            }
        }
        
        fetchCharData();
        fetchLinearData()
    }, [filename]);

    useEffect(() => {
        console.log(`In useEffect`, tabValue)
        if(chartData && linearData) {
            const initialTab = {
                key: 'main',
                label: '전체 그래프',
                children: (
                    <div className='TabsChild' style={{display: 'flex', justifyContent: 'center'}}>
                        <RegressionChart chartData={chartData} style={{marginTop: 100}}/>
                    </div>
                ),
            }
            
            const weightPerDelayTab = {
                key: 'weight',
                label: '진동 기준에 따른 이격거리별 최대 허용 지발당 장약량 (kg/delay)',
                children: (
                    <div>
                        <WieghtPerDelayChart 
                            linearData={linearData}
                            tabValue={tabValue['weight']}
                        />
                    </div>
                )
            }

            const nomogramChart = {
                key: 'nomogram',
                label: 'Nomogram 그래프',
                children: (
                    <div>
                        <NomoGramChart
                            linearData={linearData}
                            tabValue={tabValue['nomogram']}
                        />
                    </div>
                )
            }

            const compareChart = {
                key: 'compare',
                label: '국토부 선행호기 영역 비교',
                children: (
                    <div>
                        <CompareTab
                            linearData={linearData}
                            tabValue={tabValue['compare']}
                        />
                    </div>
                )
            }
            setTabPanes([initialTab, weightPerDelayTab, nomogramChart, compareChart]);
            setActiveKey('main');
        }
    }, [chartData, filename, tabValue, linearData])

    const updateTabValue = (item, arrayName) => {        
        const testData = {
            ...tabValue,
            [activeKey]: {
                ...item,
                [arrayName]: item[arrayName]?.map(row => row.map(value => !isNaN(value) ? Number(value) : value)) // 배열 값을 숫자로 변환
            }
        }
        
        setTabValue(testData);
        
        // setTabValue((prevTabValue) => ({
        //     ...prevTabValue, // 이전 상태를 복사
        //     [activeKey]: {
        //         ...item, // item의 기존 데이터 복사
        //         [arrayName]: item[arrayName]?.map(row => row.map(value => !isNaN(value) ? Number(value) : value)) // 배열 값을 숫자로 변환
        //     }
        // }));
    
        setShowModal(false);
    }

    return (
        <div>
            <Tabs
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                items={tabPanes}
                tabBarExtraContent={
                    (activeKey !== 'main' && activeKey !== 'setting') ? <Button type="link" onClick={() => setShowModal(true)}>설정</Button> : null
                }
            />

            <SettingModal
                modalStatus={showModal}
                onOK={updateTabValue}
                onCancel={() => setShowModal(false)}
                tabValue={activeKey !== 'main' ? tabValue[activeKey] : tabValue}
                activeKey={activeKey}
            />
        </div>
    )
}

export default LinearTabs;