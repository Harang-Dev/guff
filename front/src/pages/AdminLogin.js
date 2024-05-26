import React from 'react';
import LoginForm from '../components/LoginForm';
import { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #2B2D31;
    }
`;


function AdminLogin(props) {
    return (
        <div>
            <GlobalStyle />
            <LoginForm />
        </div>
    );
}

export default AdminLogin;