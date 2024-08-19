import { Line } from '@antv/g2plot';
import React, { useEffect, useRef } from 'react';
import { Button } from 'antd';

const XYZChart = ({ data }) => {
  const chartRef = useRef(null);

  const transformedData = (tempData) => {
    return tempData.flatMap(item => [
      { time: item['time'], value: parseFloat(item['tran']), division: 'tran' },
      { time: item['time'], value: parseFloat(item['vert']), division: 'vert' },
      { time: item['time'], value: parseFloat(item['long']), division: 'long' },
    ]);
  };

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const linePlot = new Line(chartRef.current, {
      data: transformedData(data),
      xField: 'time',
      yField: 'value',
      seriesField: 'division',
      xAxis: {
        title: {
          text: 'TIME(SEC)',  // X축 제목
          style: {
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#000',
            fontFamily: 'Lucida Console',
          },
        },
        label: {
          style: {
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#000',
            fontFamily: 'Lucida Console',
          },
          formatter: (val) => Number(val).toFixed(2), // 소수점 2자리로 설정
        },
        tickCount: 5,
      },
      yAxis: {
        title: {
          text: 'PPV(mm/sec)',  // Y축 제목
          style: {
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#000',
            fontFamily: 'Lucida Console',
          },
        },
        label: {
          style: {
            fontSize: 16,
            fontWeight: 'bold',
            fill: '#000',
            fontFamily: 'Lucida Console',
          },
          formatter: (val) => Number(val).toFixed(2), // 소수점 2자리로 설정
        },
        tickCount: 5,
      },
      legend: {
        position: 'top-left', // 범례 위치 설정
      },
      slider: {
        start: 0,
        end: 1,
      },
      point: {
        shape: 'circle',
        size: 2,
        style: () => {
          return {
            fillOpacity: 0,
            stroke: 'transparent',
          };
        },
      },
      appendPadding: [0, 0, 0, 0],
      smooth: true,
      lineStyle: {
        lineWidth: 1.5,
      },
      theme: {
        geometries: {
          point: {
            circle: {
              active: {
                style: {
                  r: 4,
                  fillOpacity: 1,
                  stroke: '#000',
                  lineWidth: 1,
                },
              },
            },
          },
        },
      },
      interactions: [{ type: 'marker-active' }, { type: 'brush' }],
    });

    linePlot.render();

    return () => linePlot.destroy(); // Cleanup chart on component unmount

  }, [data]);

  return  <div ref={chartRef} style={{ width: '100%' }} />;


  // return (
  // <div>
  //         <Button onClick={console.log('2')} style={{ marginBottom: 10 }}>
  //       전체 범위 보기
  //     </Button>

  // </div>
  // )
};

export default XYZChart;