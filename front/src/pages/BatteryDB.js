import React from 'react';
import styled from 'styled-components';
import BatteryHeader from '../components/BatteryHeader';
import BatteryTable from '../components/BatteryTable';

const GlobalContainer = styled.div`
    background-color: #F5F6F7;
`;




function BatteryDB(props) {
    return (
        <div>
            <GlobalContainer>
                <BatteryHeader />
                <BatteryTable />
            </GlobalContainer>
        </div>
    );  
}

export default BatteryDB;