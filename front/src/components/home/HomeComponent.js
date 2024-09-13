import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CustomCalendar from '../schedule/CustomCalendar';

import { Card, Row, Col, message, Divider, Statistic } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;

const HomeComponent = () => {
    const [assetItem, setAssetItem] = useState([]);
    const [onItem, setOnItem] = useState([]);
    const [offItem, setOffItem] = useState([]);
    const [monthItem, setMonthItem] = useState([]);

    useEffect(() => {
        // const fetchBattery = async () =>  {
        //     try {
        //         const response = await axios.get(`${API_URL}/battery/view`);
        //         const filteredData = response.data.filter(item => calcBatteryDate(item.due_date, item.replace_cycle) == true)
        //         setBatteryItem(filteredData);
        //     } catch(error) {
        //         message.error('배터리 현황 불러오기 실패');
        //     }
        // }

        const fetchAsset = async() => {
            try {
                const response = await axios.get(`${API_URL}/asset/view`);
                // const filteredAssetItem = response.data.filter(item => calcAssetDate(item.start_date) && calcAssetDate(item.end_date) == true)
                // setAssetItem(filteredAssetItem);
                setAssetItem(response.data)
            } catch(error) {
                message.error('계측기 현황 불러오기 실패');
            }
        }

        // fetchBattery();
        fetchAsset();
    }, []);
    
    useEffect(() => {
        if (assetItem) {
            const currentMonth = new Date().getMonth() + 1;
            const currentYear = new Date().getFullYear();
            
            const currentMonthData = assetItem.map(item => {
                const dataMonth = new Date(item.end_date).getMonth() + 1
                const dataYear = new Date(item.end_date).getFullYear();

                if (dataMonth === currentMonth && dataYear === currentYear) {
                    return item
                } else {
                    return null
                }
            }).filter(item => item !== undefined)

            setMonthItem(currentMonthData);
            setOnItem(assetItem.filter(item => item.state === true));
            setOffItem(assetItem.filter(item => item.state === false))
        }
    }, [assetItem])

    return (
        <Row gutter={16}>
            <Divider />


            <Col span={8}>
                <Card bordered >
                    <Statistic 
                        title={`${(new Date().getMonth() + 1)}월 검·교정 현황`}
                        value={`${monthItem.length.toFixed()} 건`}
                        precision={2}
                    />
                </Card>
            </Col>

            <Col span={8}>
                <Card>
                    <Statistic 
                        title={`사용 계측기 현황`}
                        value={`${onItem.length.toFixed()} 개`}
                        precision={2}
                    />
                </Card>
            </Col>

            <Col span={8}>
                <Card>
                    <Statistic 
                        title={`미사용 계측기 현황`}
                        value={`${offItem.length.toFixed()} 개`}
                        precision={2}
                    />
                </Card>
            </Col>

            <Divider />

            <CustomCalendar />
        </Row>

    );
};

export default HomeComponent;