import React from 'react';
import AnalyzeBox from '../../components/analyze/AnalyzeBox';
import CustomLayout from '../../components/layout/CustomLayout';
import { Typography, Divider } from 'antd';

const { Title } = Typography;

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