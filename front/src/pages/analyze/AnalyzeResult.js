import React from 'react';
import AnalyzeSuccess from '../../components/analyze/AnalyzeSuccess';
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

            <AnalyzeSuccess/>
        </CustomLayout>
    );
}

export default Analyze;