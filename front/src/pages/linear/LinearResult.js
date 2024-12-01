import React from 'react';
import CustomLayout from '../../components/layout/CustomLayout';
import LinearTabs from '../../components/linear/LinearTabs';

import { Divider, Typography, Row, Col } from 'antd';

const { Title } = Typography;

const LinearResult = () => {

  return (
      <CustomLayout>
            <Typography>
                <Title>회귀 분석기</Title>  
            </Typography>

            <Divider/>
            <LinearTabs />
      </CustomLayout>
  );
}

export default LinearResult;