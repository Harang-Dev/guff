import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
    width: 100%;
    height: 66px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
    bottom: 0;
    left: 0;    
`;

const StyledSpan = styled.span`
    color: #7d7d7d;
    font-weight: bold;
    font-size: 15px;
`;

function Footer(props) {
    return (
        <FooterContainer>
            <StyledSpan>2019 Slowalk, some rights reserved.</StyledSpan>
        </FooterContainer>
    );
}

export default Footer;