import React from 'react';
import WaveTable from '../../components/wave_analyze/WaveTable';
import PPVChart from '../../components/wave_analyze/PPVChart';
import XYZChart from '../../components/wave_analyze/XYZChart';
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
            <WaveTable />
            <PPVChart />
            <XYZChart />
      </CustomLayout>
  );
}

export default WaveResult;