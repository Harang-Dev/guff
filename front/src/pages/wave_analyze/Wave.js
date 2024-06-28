import React from 'react';
import WaveBox from '../../components/wave_analyze/WaveBox';
import CustomLayout from '../../components/layout/CustomLayout';
import { Divider, Typography } from 'antd';

const { Title } = Typography;

const Wave = () => {
  return (
      <CustomLayout>
          <Typography>
              <Title>파형 분석기</Title>  
          </Typography>

          <Divider/>

          <WaveBox />
      </CustomLayout>
  );
}

export default Wave;