import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Tabs, } from 'antd';
import axios from 'axios';
import RegressionChart from './RegressionChart';
import WieghtPerDelayChart from './WeightPerDelayChart';
import NomoGramChart from './nomogram/NomoGramChart';
import CompareTab from './compare/CompareTab';
import ValueSeeting from './ValueSetting';

const API_URL = process.env.REACT_APP_API_URL;

const LinearTabs = () => {
    const location = useLocation();
    const { filename } = location.state || {};

    const [linearData, setLinearData] = useState(null);
    const [tabPanes, setTabPanes] = useState([]);
    const [activeKey, setActiveKey] = useState(0);
    const [chartData, setChartData] = useState(null);
    const [showValueSeeting, setShowValueSeeting] = useState(false);

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
                console.log(error)
            }
        }

        const fetchLinearData = async() => {
            try {
                const response = await axios.get(`${API_URL}/linear/linregress/result/${filename}`);
                setLinearData(response.data);
            } catch(error) {
                console.log(error)
            }
        }
        
        fetchCharData();
        fetchLinearData()
    }, [filename]);

    useEffect(() => {
        if(chartData && linearData) {
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

            const testChart = {
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
            setTabPanes([initialTab, weightPerDelayTab, nomogramChart, testChart]);
            setActiveKey('0');
        }
    }, [chartData, filename, tabValue, linearData])

    const handleClick = () => {
        const item = {
            key: 'setting',
            label: '설정',
            children: (
                <ValueSeeting 
                    tabValue={tabValue} 
                    activeKey={activeKey} 
                    onSave={handleValueSetting}
                />
            )
        }


        if (showValueSeeting) {
            setTabPanes([...tabPanes.filter(item => item.key != 'setting'), item])
        } else {
            setTabPanes([...tabPanes, item])
            setShowValueSeeting(true);
        }
        setActiveKey('setting')
    };

    const handleValueSetting = (newValues, activeKey) => {
        const filterPanes = tabPanes.filter(item => item.key != 'setting')
        
        setTabValue((prevTabValue) => ({
            ...prevTabValue,
            [activeKey]: {
                ...newValues
            }
        }));

        setTabPanes(filterPanes)
        setActiveKey(activeKey)
    };

    return (
        <div>
            <Tabs
                activeKey={activeKey}
                onChange={(key) => setActiveKey(key)}
                items={tabPanes}
                tabBarExtraContent={
                    activeKey != 0 ? <Button type="link" onClick={handleClick}>설정</Button> : null
                }
            />
        </div>
    )
}

export default LinearTabs;