import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { Line } from '@ant-design/plots'
import { Typography } from "antd";
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const { Title } = Typography;

const PPVChart = () => {
  const location = useLocation();
  const { filename } = location.state || {};
  const [ data, setData ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://${API_URL}:8000/wave/${filename}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [filename]);
    
    const config = {
        data,
        xField: 'time',
        yField: 'ppv',
        shapeField: 'smooth',
      };

    return (
      <div>
        <Typography>
          <Title level={4}>PPV Graph</Title>
        </Typography>
        <div id="ppv-container">
          <Line {...config} />
        </div>
      </div>
    );
}

export default PPVChart;