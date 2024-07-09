import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Line } from '@ant-design/plots';
import { Typography } from 'antd';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const { Title } = Typography;

const XYZChart = () => {
  const location = useLocation();
  const { filename } = location.state || {};
  const [ data, setData ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/wave/${filename}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filename]);

  const transformedData = useMemo(() => {
    return data.flatMap(item => [
      { time: parseFloat(item['time']), value: parseFloat(item['tran']), division: 'tran' },
      { time: parseFloat(item['time']), value: parseFloat(item['vert']), division: 'vert' },
      { time: parseFloat(item['time']), value: parseFloat(item['long']), division: 'long' },
    ]);
  }, [data]);

  const config = {
    data: transformedData,
    xField: 'time',
    yField: 'value',
    seriesField: 'division',
    colorField: 'division',
    scale: { color: { range: ['#30BF78', '#F4664A', '#FAAD14'] } },
    shapeField: 'smooth',
  };

  return (
    <div>
      <Typography>
        <Title level={4}>XYZ Graph</Title>
      </Typography>
      <div id="xyz-container">
        <Line {...config} />
      </div>
    </div>
  );
};

export default XYZChart;