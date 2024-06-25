import React from 'react';
import AnalyzeBox from '../../components/analyze/AnalyzeBox';
import CustomLayout from '../../components/layout/CustomLayout';
import { Layout, Typography, Divider } from 'antd';

const { Title } = Typography;
const { Content } = Layout;

function Analyze(props) {
    return (
        <CustomLayout>
            <Typography>
                <Title>한글 분석기</Title>
            </Typography>

            <Divider />

            <AnalyzeBox/>
        </CustomLayout>
    );
}

export default Analyze;