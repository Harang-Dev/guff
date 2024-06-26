import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';

import { bColumn, aColumn } from './homeColumns';
import { Card, Row, Col, Statistic, message, Table, Empty, Calendar, Divider } from 'antd';


const HomeComponent = () => {
    const [batteryItem, setBatteryItem] = useState([]);
    const [assetItem, setAssetItem] = useState([]);

    useEffect(() => {
        const fetchBattery = async () =>  {
            try {
                const response = await axios.get('http://192.168.0.102:8000/battery/');
                const filteredData = filterAndSortData(response.data);
                setBatteryItem(filteredData);
            } catch(error) {
                message.error('배터리 현황 불러오기 실패');
            }
        }

        const fetchAsset = async() => {
            try {
                const response = await axios.get('http://192.168.0.102:8000/asset/');
                console.log(response.data);

                const filteredAssetItem = filterAndSortData(response.data);
                setAssetItem(filteredAssetItem);
            } catch(error) {
                message.error('계측기 현황 불러오기 실패');
            }
        }

        fetchBattery();
        console.log(batteryItem);
        fetchAsset();
    }, []);

    const isValidDate = (dateStr) => {
        return dayjs(dateStr, 'YYYY-MM-DD', true).isValid();
      };

      const filterAndSortData = (data) => {
        const today = dayjs();
        const oneWeekFromNow = today.add(7, 'day');
    
        // 날짜 필드를 동적으로 찾기
        const dateFields = Object.keys(data[0]).filter(key => isValidDate(data[0][key]));
    
        // 데이터 필터링 및 정렬
        return data
          .filter(item => {
            // 날짜 필드 중 하나라도 조건을 만족하는지 확인
            return dateFields.some(field => {
              const date = dayjs(item[field]);
              return (date.isSame(today) || date.isAfter(today)) && date.isBefore(oneWeekFromNow);
            });
          })
          .map(item => {
            // 가장 가까운 날짜 필드 찾기
            const closestDateField = dateFields
              .map(field => ({ field, date: dayjs(item[field]) }))
              .filter(({ date }) => (date.isSame(today) || date.isAfter(today)) && date.isBefore(oneWeekFromNow))
              .sort((a, b) => a.date - b.date)[0];
    
            return { ...item, closestDate: closestDateField.date };
          })
          .sort((a, b) => a.closestDate - b.closestDate)
          .slice(0, 5); // 상위 5개 항목 선택
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

            {/* <Col span={8}>
                <Card title="한글 분석기" bordered={true}>
                    사용하러가기 ㅋ
                </Card>
            </Col> */}

            <Divider />

            <Calendar></Calendar>
        </Row>

    );
};

export default HomeComponent;