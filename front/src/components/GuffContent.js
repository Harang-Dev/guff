import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.div`
    width: 1920px;
    height: 165px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const HeaderTitle = styled.h2`
    font-size: 35px;
    font-weight: bold;
    margin-left: 75px;
`;

const ContentContainer = styled.div`
    width: 1920px;
    height: 249px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-left: 75px;
`;

const ButtonContainer = styled.div`
    width: 177px;
    height: 250px;
    margin-right: 122px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: center;
`;

const GuffContentButton = styled(Link)`
    width: 177px;
    height: 177px;
    border-radius: 20px;
    background-color: ${props => props.color};
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    transition: border 0.1s ease;

    &:hover {
        border: 2px solid ${props => {
            if (props.color === '#E8F7F2') return '#188BA7';
            if (props.color === '#F5EDFF') return '#6500C2';
            if (props.color === '#CEF3FF') return '#33CEFF';
            return props.color;
        }};
    }
`;

const StyledSpan = styled.span`
    font-size: 20px;
    font-weight: 500;
    color: #000000;
`;

function GuffContent() {
    return (
        <div>
            <HeaderContainer>
                <HeaderTitle>기능 사용하기</HeaderTitle>
            </HeaderContainer>
            <ContentContainer>
                <ButtonContainer>
                    <GuffContentButton color="#E8F7F2" to='/Analyze' />
                    <StyledSpan>한글분석기</StyledSpan>
                </ButtonContainer>
                <ButtonContainer>
                    <GuffContentButton color="#F5EDFF" to='/BatteryDB' />
                    <StyledSpan>배터리 DB</StyledSpan>
                </ButtonContainer>
                <ButtonContainer>
                    <GuffContentButton color="#CEF3FF" to='/BatteryDB' />
                    <StyledSpan>계측기 관리</StyledSpan>
                </ButtonContainer>
            </ContentContainer>
        </div>
    );
}

export default GuffContent;
