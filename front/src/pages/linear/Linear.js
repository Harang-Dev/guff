import React from 'react';
import LinearBox from '../../components/linear/LinearBox';
import CustomLayout from '../../components/layout/CustomLayout';
import { Divider, Typography } from 'antd';

const { Title } = Typography;

const Linear = () => {
  return (
      <CustomLayout>
          <Typography>
              <Title>회귀 분석기</Title>  
          </Typography>

          <Divider/>

          <LinearBox />
      </CustomLayout>
  );
}

export default Linear;