import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        padding-top: 102px;
        margin: 0;
        box-sizing: border-box;
    }
`;

const NavContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 1920px;
    height: 102px;
    border-bottom: 1px solid black;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: white;
    z-index: 1000;
`;

const LogoContainer = styled(Link)`
    width: 120px;
    height: 43px;
    background-image: url('/media/logo.png');
    background-repeat: no-repeat;
    margin-left: 70px;
    cursor: pointer;
`;

const MenuList = styled.ul`
    display: flex;
`;

const MenuItem = styled.li`
    margin-right: 70px;
    list-style: none;
    color: #7D7D7D;
    cursor: pointer;

    a {
        text-decoration: none;
    }
`;

function Nav(props) {
    return (
        <>
            <GlobalStyle />
            <NavContainer>
                <LogoContainer to="/" />
                <MenuList>
                    <MenuItem><Link to="/">공지사항</Link></MenuItem>
                    <MenuItem><Link to="/Analyze">한글 분석기</Link></MenuItem>
                    <MenuItem><Link to="/BatteryDB">배터리 DB</Link></MenuItem>
                    <MenuItem><Link to="/Asset">계측기 관리</Link></MenuItem>
                </MenuList>
            </NavContainer>
        </>
    );
}

export default Nav;
