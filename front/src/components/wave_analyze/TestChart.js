import { Line } from '@antv/g2plot';
import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

const G2Test = () => {
  const chartRef = useRef(null);
  const location = useLocation();
  const { filename } = location.state || {};
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/wave/${filename}`);
        const rawData = response.data;

        setData(rawData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filename]);

  useEffect(() => {
    if (!chartRef.current) return;

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
        nice: true
      },
      yAxis: {
        label: {
          style: {
            fontSize: 14,
            fontWeight: 'bold',
            fill: '#000',
          },
        },
        nice: true
      },
      animation: {
        appear: {
          animation: 'path-in',
          duration: 5000,
        },
      },
      smooth: true,
      slider: {
        start: 0.1,
        end: 0.2,
      },
    });

    linePlot.render();

    return () => linePlot.destroy(); // Cleanup chart on component unmount
  }, [data]);

  return <div ref={chartRef} style={{ width: '100%' }} />;
};

export default G2Test;