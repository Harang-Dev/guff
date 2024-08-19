import { Line } from '@antv/g2plot';
import React, { useEffect, useRef } from 'react';

const PPVChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || !data) return;

    const dataWithSeries = data.map(item => ({ ...item, series: 'PPV' }));

    const linePlot = new Line(chartRef.current, {
      data: dataWithSeries,
      xField: 'time',
      yField: 'ppv',
      seriesField: 'series',
      xAxis: {
        title: {
          text: 'TIME(SEC)',
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
          formatter: (val) => Number(val).toFixed(2),
        },
        tickCount: 5,
      },
      yAxis: {
        title: {
          text: 'PPV(mm/sec)',
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
          formatter: (val) => Number(val).toFixed(2),
        },
        tickCount: 5,
      },
      legend: {
        position: 'top-left',
      },
      smooth: true,
      slider: {
        start: 0,
        end: 1,
      },
      annotations: [
        {
          type: 'region',
          start: ['-0.250', 'min'],  // 범위의 시작점 (x = 1.00)
          end: ['0.197', 'max'],  // 범위의 끝점 (x = 2.00)
          style: {
            fill: '#FF0000',
            fillOpacity: 0.2,  // 투명도 설정
          },
        },
        {
          type: 'text',
          position: [1.5, 'max'], // 텍스트가 표시될 위치
          content: '범위 표시 (1.00초 ~ 2.00초)',
          style: {
            fill: '#FF0000',
            fontSize: 14,
            fontWeight: 'bold',
            textAlign: 'center',
          },
          offsetY: -10,
        },
      ],
      point: {
        shape: 'circle',
        size: 3,
        style: () => {
          return {
            fillOpacity: 0,
            stroke: 'transparent',
          };
        },
      },
      appendPadding: [0, 0, 0, 0],
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

  return <div ref={chartRef} style={{ width: '100%' }} />;
};

export default PPVChart;