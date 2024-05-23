import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
    width: 1920px;
    height: 66px;
    border-top: 1px black solid;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const StyledSpan = styled.span`
    color: #7d7d7d;
    font-weight: bold;
    font-size: 15px;
`;

function Footer(props) {
    return (
        <div>
            <FooterContainer>
                <StyledSpan>2019 Slowalk, some rights reserved.</StyledSpan>
            </FooterContainer>
        </div>
    );
}

export default Footer;