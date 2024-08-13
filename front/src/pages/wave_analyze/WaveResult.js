import React from 'react';
import WaveTable from '../../components/wave_analyze/WaveTable';
import PPVChart from '../../components/wave_analyze/PPVChart';
import XYZChart from '../../components/wave_analyze/XYZChart';
import CustomLayout from '../../components/layout/CustomLayout';
import G2PlotChart from '../../components/wave_analyze/TestChar';
import G2Test from '../../components/wave_analyze/TestChart';
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
            <Row>
              <Col span={24}>
              <G2Test />
                {/* <PPVChart /> */}
              </Col>
              <Col span={24}>
                <G2PlotChart />
                {/* <XYZChart /> */}
              </Col>
            </Row>
      </CustomLayout>
  );
}

export default WaveResult;