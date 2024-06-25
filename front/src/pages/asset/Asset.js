import React  from 'react';
import AssetTable from '../../components/asset/AssetTable';
import CustomLayout from '../../components/layout/CustomLayout';
import { Typography, Divider } from 'antd';

const { Title } = Typography;

const Asset = () => {
    return (
        <CustomLayout>
            <Typography>
                <Title>계측기 관리</Title>  
            </Typography>

            <Divider />

            <AssetTable />
        </CustomLayout>
    );
}

export default Asset;