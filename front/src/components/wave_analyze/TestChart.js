import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Line, Column } from '@antv/g2plot';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const G2PlotChart = () => {
  const chartRef = useRef(null);
  const location = useLocation();
  const { filename } = location.state || {};
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/wave/${filename}`);
        const rawData = response.data

        // 중복된 데이터 제거
        const uniqueData = rawData.reduce((acc, current) => {
          const x = parseFloat(current.time);
          const y = parseFloat(current.ppv);

          if (!acc.find(item => item.time === x && item.ppv === y)) {
            acc.push({ time: x, ppv: y });
          }

          return acc;
        }, []);

        setData(uniqueData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filename]);

  useEffect(() => {
    if (!chartRef.current || data.length === 0) return;

    const linePlot = new Line(chartRef.current, {
      data,
      xField: 'time',
      yField: 'ppv',
      xAxis: {
        label: {
          style: {
            fontSize: 14,
            fontWeight: 'bold',
            fill: '#000',
          },
        },
        tickCount: 5,
        nice: true,
      },
      yAxis: {
        label: {
          style: {
            fontSize: 14,
            fontWeight: 'bold',
            fill: '#000',
          },
        },
        tickCount: 5,
        nice: true,
      },
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },
      smooth: true,
      regressionLine: false, // 추세선 비활성화
      interactions: 'Zoom',
      slider: {
        start: 0.1,
        end: 0.5,
      },
    });

    linePlot.render();

    return () => linePlot.destroy(); // Cleanup chart on component unmount
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%' }} />;
};

export default G2PlotChart;