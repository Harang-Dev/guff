import React from "react";
import { useLocation } from 'react-router-dom';
import { Line } from '@ant-design/plots'
import { Divider, Typography } from "antd";

const { Title } = Typography;

const WaveGraph = () => {
    const location = useLocation();
    const { version, filename, data } = location.state || {};
    
    const config = {
        data,
        xField: 'Time(ms)',
        yField: 'PPV',
        shapeField: 'smooth',
      };

    return (
      <div>
        <Typography>
          <Title level={4}>PPV Graph</Title>
        </Typography>
        <Line {...config} />
      </div>
    );
}

export default WaveGraph;