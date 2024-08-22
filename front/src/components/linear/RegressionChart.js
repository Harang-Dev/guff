import React, { useEffect, useRef, useState } from 'react';
import { Mix } from '@antv/g2plot';

import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const RegressionChart = ({ chartData }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && chartData) {
            // 데이터 필터링 (0보다 큰 값만 남기기)
            const dataPoint = chartData.x.map((item, index) => ({
                x: chartData.x[index],
                y: chartData.y[index],
            })).filter(point => point.x > 0 && point.y > 0);
    
            // 회귀선 데이터 정렬 및 필터링
            const regressionData = ['c50', 'c84', 'c95'].map(type => 
                chartData[type].map((item, index) => ({
                    x: chartData.xValue[index],
                    y: item,
                    type: type,
                })).filter(point => point.x > 0 && point.y > 0)
            );
    
            // 모든 회귀선 데이터를 합치기
            const allRegressionData = [].concat(...regressionData);
    
            // 그래프 그리기
            const plot = new Mix(containerRef.current, {
                autoFit: true,
                plots: [
                    {
                        type: 'line',
                        options: {
                            data: allRegressionData,
                            xField: 'x',
                            yField: 'y',
                            seriesField: 'type',
                            colorField: 'type',
                            lineStyle: {
                                lineWidth: 2,
                            },
                            xAxis: {
                                type: 'log',
                                min: 1,
                                max: 10000,

                            },
                            yAxis: {
                                type: 'log',
                                min: 0.001,
                                max: 1000,
                            },
                        },
                    },
                    {
                        type: 'scatter',
                        options: {
                            data: dataPoint,
                            xField: 'x',
                            yField: 'y',
                            size: 3,
                            pointStyle: {
                                stroke: '#777777',
                                lineWidth: 1,
                                fill: '#5B8FF9',
                            },
                            xAxis: {
                                type: 'log',
                                min: 1,
                                max: 10000,

                            },
                            yAxis: {
                                type: 'log',
                                min: 0.001,
                                max: 1000,
                            },
                        },
                    },

                ],
                syncView: true,  // 여러 플롯이 동일한 축을 공유하도록 설정
            });
    
            plot.render();
    
            return () => {
                plot.destroy(); // 컴포넌트가 언마운트될 때 차트를 파괴합니다.
            };
        }
    }, [chartData]);

  return <div ref={containerRef} style={{ width: '30%' }} />;
};

export default RegressionChart;