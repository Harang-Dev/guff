import React from 'react';
import AdminNav from '../components/AdminNav';
import AdminFooter from '../components/AdminFooter';
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
            <AdminNav />
            <LoginForm />
            <AdminFooter />
        </div>
    );
}

export default AdminLogin;