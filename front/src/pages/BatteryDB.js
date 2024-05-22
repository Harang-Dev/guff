import React from 'react';
import styled from 'styled-components';
import Nav from '../components/Nav';
import BatteryHeader from '../components/BatteryHeader';
import BatteryTable from '../components/BatteryTable';
import Footer from '../components/Footer';

const GlobalContainer = styled.div`
    background-color: #F5F6F7;
`;

function BatteryDB(props) {
    return (
        <div>
            <Nav />
            <GlobalContainer>
                <BatteryHeader />
                <BatteryTable />
            </GlobalContainer>
            <Footer />
        </div>
    );  
}

export default BatteryDB;