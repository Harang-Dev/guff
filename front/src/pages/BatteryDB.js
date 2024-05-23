import React from 'react';
import styled from 'styled-components';
import Nav from '../components/Nav';
import BatteryHeader from '../components/BatteryHeader';
import BatteryTable from '../components/BatteryTable';
import Footer from '../components/Footer';
import axios from "axios";

const GlobalContainer = styled.div`
    background-color: #F5F6F7;
`;

function BatteryDB(props) {
    const getBetterDB = async () => {
        try {
            const response = await axios.get(
                `http://127.0.0.1:8000/battery/`
            );
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    
    getBetterDB(); 

    return (
        <div>
            <Nav />
            <GlobalContainer>
                {/* <BatteryHeader /> */}
                <BatteryTable />
            </GlobalContainer>
            <Footer />
        </div>
    );  
}

export default BatteryDB;