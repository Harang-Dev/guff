import React from 'react';
import WaveTable from '../../components/wave_analyze/WaveTable';
import CustomLayout from '../../components/layout/CustomLayout';

import { Divider, Typography, Row, Col } from 'antd';

const { Title } = Typography;

const WaveResult = () => {

  return (
      <CustomLayout>
            <Typography>
                <Title>파형 분석기</Title>  
            </Typography>

            <Divider/>
            <WaveTable />
      </CustomLayout>
  );
}

export default WaveResult;