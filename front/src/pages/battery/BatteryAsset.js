import React from 'react';
import BatteryTable from '../../components/battery/BatteryTable';
import CustomLayout from '../../components/layout/CustomLayout';
import { Divider, Typography } from 'antd';

const { Title } = Typography;

const BatteryAsset = () => {
  return (
      <CustomLayout>
          <Typography>
              <Title>배터리 관리</Title>  
          </Typography>

          <Divider/>

          <BatteryTable />
      </CustomLayout>
  );
}

export default BatteryAsset;