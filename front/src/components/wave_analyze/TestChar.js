import { Line } from '@antv/g2plot';
import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
        setData(transformedData(response.data));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filename]);

  const transformedData = (tempData) => {
    return tempData.flatMap(item => [
      { time: parseFloat(item['time']), value: parseFloat(item['tran']), division: 'tran' },
      { time: parseFloat(item['time']), value: parseFloat(item['vert']), division: 'vert' },
      { time: parseFloat(item['time']), value: parseFloat(item['long']), division: 'long' },
    ]);
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const linePlot = new Line(chartRef.current, {
      data: data,
      xField: 'time',
      yField: 'value',
      seriesField: 'division',
      xAxis: {
        label: {
          style: {
            fontSize: 14,
            fontWeight: 'bold',
            fill: '#000',
          },
        },
      },
    yAxis: {
      label: {
        style: {
          fontSize: 14,
          fontWeight: 'bold',
          fill: '#000',
        },
      },
    },
    smooth: true,
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