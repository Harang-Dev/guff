import React, { useState, useEffect } from 'react';
import { Button, Table, message } from 'antd';

const WieghtPerDelayChart = ({ linearData, tabValue }) => {
    const [distance, setDistance] = useState([]);
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
        if (tabValue) {
            const start = tabValue.start
            const end = tabValue.end
            const interval = tabValue.interval

            const length = Math.ceil((end - start) / interval) + 1;
            const distanceArray = Array.from({length}, (_, index) => start + index * interval)
            setDistance(distanceArray);
        }
    }, [tabValue])

    useEffect(() => {
        if(linearData && distance) {
            const tempData = distance.map((item, index) => {
                const temp = {distance: item}
                tabValue.delay.forEach((delay, index) => {
                    temp[`delay${index + 1}`] = (delay / linearData.k95) ** (2/(-linearData.nValue)) * item ** 2
                })
                return temp; // map()에서 새로운 배열을 반환해야 하므로 temp 반환
            });
                    
            if (tempData.length > 0) setTableData(tempData); 
        }
    }, [linearData, tabValue, distance]) // 필요한 모든 상태를 의존성 배열에 추가

    const columns = [
        {
            title: 'Distance (m)',
            dataIndex: 'distance',
            align: 'center',
        },
        {
            title: '진동 기준에 따른 이격거리별 최대 허용 지발당 장약량 (kg/delay)',
            align: 'center',
            children: tabValue.delay.map((item, index) => ({
                title: `${item}cm/sec`,
                dataIndex: `delay${index + 1}`,
                render: (text, record) => text.toFixed(3),
                align: 'center'
            }))
        }
    ]

    return (
        <div>
            <Table 
                columns={columns}
                dataSource={tableData}
                pagination={false}
                scroll={{ y: 700 }}
            />
        </div>
    )
}

export default WieghtPerDelayChart;