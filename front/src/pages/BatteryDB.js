import React from 'react';
import styled from 'styled-components';
import BatteryHeader from '../components/BatteryHeader';
import BatteryTable from '../components/BatteryTable';

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
            <GlobalContainer>
                {/* <BatteryHeader /> */}
                <BatteryTable />
            </GlobalContainer>
        </div>
    );  
}

export default BatteryDB;