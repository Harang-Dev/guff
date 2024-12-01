import React, { useState, useEffect, useRef } from 'react';
import { Table, Collapse, Divider } from 'antd';
import { Scatter } from '@antv/g2plot';

const WeightPerDelayChart = ({ linearData, standardWave, distance }) => {
    const [data, setData] = useState(null);

    const containerRef = useRef(null);

    const roundDown = (value, precision) => {
        return Math.floor(value * Math.pow(10, precision)) / Math.pow(10, precision);
    }

    useEffect(() => {
        const transformData = distance.map((data, index) => ({
            distance: data,
            ministry: roundDown(((standardWave/200) ** (2/-(-1.600)) * data ** 2), 3),
            test84: roundDown(((standardWave/linearData.k84) ** (2/(-linearData.nValue)) * data ** 2), 3),
            test95: roundDown(((standardWave/linearData.k95) ** (2/(-linearData.nValue)) * data ** 2), 3),
        }))

        setData(transformData);
    }, [linearData, distance, standardWave])

    useEffect(() => {
        if (data) {
            const chartData = [
                ...data.map(item => ({ x: item.distance, y: item.ministry, type: '국토교통부(84%)' })),
                ...data.map(item => ({ x: item.distance, y: item.test84, type: '시험발파결과(84%)' })),
                ...data.map(item => ({ x: item.distance, y: item.test95, type: '시험발파결과(95%)' })),
            ];

            const line = new Scatter(containerRef.current, {
                data: chartData,
                xField: 'x',
                yField: 'y',
                shapeField: 'type',
                shape: ( item ) => {
                    const type = item.type
                    if (type === '국토교통부(84%)') {
                        return 'diamond'; 
                    } else if (type === '시험발파결과(84%)') {
                        return 'hexagon'; 
                    } else if (type === '시험발파결과(95%)') {
                        return 'triangle'; 
                    }
                },
                colorField: 'type', // seriesField에 따라 색상을 다르게 설정
                size: 8,
                xAxis: {
                    title: {
                        text: '이격거리 (m)',
                        style: {
                            fontSize: 16,
                            fontWeight: 'bold',
                            fill: '#000',
                            fontFamily: 'Lucida Console',
                        }
                    },
                },
                yAxis: {
                    title: {
                        text: '장약량 (kg/delay)',
                        style: {
                            fontSize: 16,
                            fontWeight: 'bold',
                            fill: '#000',
                            fontFamily: 'Lucida Console',
                        }
                    },
                },
                legend: {
                    position: 'top-left',
                },
                pointStyle: {
                    lineWidth: 1,
                    stroke: '#fff',
                },
            });
            
            line.render();

            return () => line.destroy();
        }
    }, [data])

    const columns = [
        {
            title: '거리',
            dataIndex: 'distance',
            align: 'center',
            key: 'distance',
        },
        {
            title: '이격거리별 허용 지발당 장약량 (kg/delay)',
            dataIndex: 'weightPerDelay',
            align: 'center',
            children: [
                {
                    title: '국토교통부(84%)',
                    dataIndex: 'ministry',
                    key: 'ministry',
                    align: 'center',
                    render: (text, record) => text.toFixed(3),
                },
                {
                    title: '시험발파결과(84%)',
                    dataIndex: 'test84',
                    key: 'test84',
                    align: 'center',
                    render: (text, record) => text.toFixed(3),
                },
                {
                    title: '시험발파결과(95%)',
                    dataIndex: 'test95',
                    key: 'test95',
                    align: 'center',
                    render: (text, record) => text.toFixed(3),
                },
            ],
        },
    ]

    return (
        <div>
            <Collapse defaultActiveKey={['1']} ghost>
                <Collapse.Panel header="그래프 보기" key="1">
                    <div style={{ display: 'flex', justifyContent: 'center'}}>
                        <div ref={containerRef} style={{ width: '50%', height: '400px', marginTop: '20px' }} />
                    </div>
                </Collapse.Panel>
            </Collapse>
            <Divider />
            <Table 
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        </div>
    )

}

export default WeightPerDelayChart;