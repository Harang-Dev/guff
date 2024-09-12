import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import CustomCalendar from '../schedule/CustomCalendar';

import { bColumn, aColumn } from './homeColumns';
import { Card, Row, Col, message, Table, Empty, Divider } from 'antd';

const API_URL = process.env.REACT_APP_API_URL;

const HomeComponent = () => {
    const [batteryItem, setBatteryItem] = useState([]);
    const [assetItem, setAssetItem] = useState([]);

    useEffect(() => {
        const fetchBattery = async () =>  {
            try {
                const response = await axios.get(`${API_URL}/battery/view`);
                const filteredData = response.data.filter(item => calcBatteryDate(item.due_date, item.replace_cycle) == true)
                setBatteryItem(filteredData);
            } catch(error) {
                message.error('배터리 현황 불러오기 실패');
            }
        }

        const fetchAsset = async() => {
            try {
                const response = await axios.get(`${API_URL}/asset/view`);
                const filteredAssetItem = response.data.filter(item => calcAssetDate(item.start_date) && calcAssetDate(item.end_date) == true)
                setAssetItem(filteredAssetItem);

                console.log(filteredAssetItem)
            } catch(error) {
                message.error('계측기 현황 불러오기 실패');
            }
        }

        fetchBattery();
        fetchAsset();
    }, []);
    
    const calcBatteryDate = (dateString, replace_cycle) => {
        if (!dateString) {
            return '';
        }

        const date = new Date(dateString);  // 교체일
        const now = new Date();
        const replaceDate = new Date(date); // 교체 주기 기준으로 계산할 날짜 복사본 생성
        replaceDate.setDate(replaceDate.getDate() + replace_cycle); // 교체 주기 더하기

        const endOfPeriod = new Date(replaceDate);
        endOfPeriod.setDate(replaceDate.getDate() - 1); // 하루 전날 계산

        now.setHours(0, 0, 0, 0); // 현재 시간을 00:00:00으로 설정
        replaceDate.setHours(23, 59, 59, 999); // 교체일의 시간을 끝으로 설정

        // 교체 주기 지난 경우 확인
        const isPastReplaceCycle = now > replaceDate;

        // 현재 날짜가 교체 주기 당일 및 하루 전날 사이에 있는지 확인
        const isWithinPeriod = now >= endOfPeriod && now <= replaceDate;

        console.log(dateString, isWithinPeriod)
        // 교체 주기가 지났다면 'overdue'를 반환, 아직 남아있다면 true/false 반환
        if (isPastReplaceCycle) {
            return 'overdue';  // 교체 주기 지난 경우
        } else {
            return isWithinPeriod;
        }
    };

    const calcAssetDate = (dateString) => {
        if (!dateString) {
            return ''; // dateString이 없을 때 빈 값 반환
        }

        const date = new Date(dateString);  // 교체일
        const now = new Date();             // 현재 날짜
        const threeDaysLater = new Date(now); // 3일 후 날짜 계산

        // 현재 날짜의 시간을 00:00:00으로 설정 (하루 단위 비교를 위해)
        now.setHours(0, 0, 0, 0);

        // 3일 후 날짜의 시간을 23:59:59로 설정
        threeDaysLater.setDate(now.getDate() + 3);
        threeDaysLater.setHours(23, 59, 59, 999);

        // 1. date가 금일 기준 3일 이내인지 확인
        const isWithinNextThreeDays = date >= now && date <= threeDaysLater;

        // 2. date가 이미 과거인지 확인
        const isPastDate = date < now;

        if (isPastDate) {
            return "overdue"
        } else {
            return isWithinNextThreeDays
        }
    };

    return (
        <Row gutter={16}>
            <Divider />


            <Col span={12}>
                <Card title="배터리 현황" bordered={true}>
                    {batteryItem ? <Table columns={bColumn(batteryItem)} dataSource={batteryItem} rowKey="id" size='small' pagination={false} /> : <Empty />}
                </Card>
            </Col>

            <Col span={12}>
                <Card title="계측기 현황" bordered={true}>
                    {batteryItem ? <Table columns={aColumn(assetItem)} dataSource={assetItem} rowKey="id" size='small' pagination={false} /> : <Empty />}
                </Card>
            </Col>

            <Divider />

            <CustomCalendar />
        </Row>

    );
};

export default HomeComponent;