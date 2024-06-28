import React from 'react';
import WaveGraph from '../../components/wave_analyze/WaveGraph';
import WaveGraph2 from '../../components/wave_analyze/WaveGraph2';
import CustomLayout from '../../components/layout/CustomLayout';
import { Divider, Typography } from 'antd';

const { Title } = Typography;

const WaveResult = () => {
  return (
      <CustomLayout>
          <Typography>
              <Title>파형 분석기</Title>  
          </Typography>

          <Divider/>

          <WaveGraph />
          <WaveGraph2 />
      </CustomLayout>
  );
}

export default WaveResult;