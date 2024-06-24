import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import BatteryTable from '../../components/battery/BatteryTable';

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #F5F6F7;
  }
`;

function BatteryDB(props) {
    return (
        <div>
            <GlobalStyle />
            <BatteryTable />
        </div>
    );
}

export default BatteryDB;
