import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    body {
        padding-top: 102px;
        margin: 0;
        box-sizing: border-box;
        background-color: #2B2D31;
    }
`;

const NavContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 1920px;
    height: 102px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: #33353A;
    z-index: 1000;
`;

const LogoContainer = styled.div`
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
`;

function Nav(props) {
    return (
        <>
            <GlobalStyle />
            <NavContainer>
                <LogoContainer to="/" />
                <MenuList>
                    <MenuItem>공지사항</MenuItem>
                    <MenuItem>한글 분석기</MenuItem>
                    <MenuItem>배터리 DB</MenuItem>
                </MenuList>
            </NavContainer>
        </>
    );
}

export default Nav;
