import React, { Children, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { DualAxes, Line } from '@ant-design/plots';
import { Divider, Typography } from 'antd';

const { Title } = Typography;

const WaveGraph2 = () => {
  const location = useLocation();
  const { version, filename, data } = location.state || {};

  const transformedData = useMemo(() => {
    return data.flatMap(item => [
      { time: parseFloat(item['Time(ms)']), value: parseFloat(item['Vib_X_Axis']), division: 'Vib_X_Axis' },
      { time: parseFloat(item['Time(ms)']), value: parseFloat(item['Vib_Y_Axis']), division: 'Vib_Y_Axis' },
      { time: parseFloat(item['Time(ms)']), value: parseFloat(item['Vib_Z_Axis']), division: 'Vib_Z_Axis' },
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
      <Line {...config} />
    </div>
  );
};

export default WaveGraph2;