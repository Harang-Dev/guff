import React, { useEffect, useRef } from 'react';
import { Mix } from '@antv/g2plot';

const RegressionChart = ({ chartData }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current && chartData) {
            const dataPoint = chartData.x.map((item, index) => ({
                x: chartData.x[index],
                y: chartData.y[index],
                type: 'point',
            })).filter(point => point.x > 0 && point.y > 0);

            const regressionData = ['c50', 'c84', 'c95'].map(type => 
                chartData[type].map((item, index) => ({
                    x: chartData.xValue[index],
                    y: item,
                    type: type === 'c50' ? '50% 추정선' : type === 'c84' ? '84% 추정선' : '95% 추정선',
                })).filter(point => point.x > 0 && point.y > 0)
            );

            const allRegressionData = [].concat(...regressionData);

            const plot = new Mix(containerRef.current, {
                autoFit: true,
                syncViewPadding: true,
                legend: { position: 'top-left', },
                plots: [
                    {
                        type: 'line',
                        options: {
                            data: allRegressionData,
                            xField: 'x',
                            yField: 'y',
                            seriesField: 'type',
                            color: (item) => {
                                if (item.type === '50% 추정선') {
                                    return 'red';
                                } else if (item.type === '84% 추정선') {
                                    return 'black';
                                } else {
                                    return 'orange';
                                }
                            },
                            // colorField: (item) => item.type === '50% 추정선' ? 'black' : item.type === '84% 추정선' ? 'green' : 'red',
                            lineStyle: (item) => item.type === '84% 추정선' ? { lineDash: [4, 4] } : {},
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
                            seriesField: 'type',
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
            });

            plot.render();

            return () => {
                plot.destroy(); 
            };
        }
    }, [chartData]);

  return (
    
    <div ref={containerRef} style={{ width: '50%' }}/>
    
  )
};

export default RegressionChart;