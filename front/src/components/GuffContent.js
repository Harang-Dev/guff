import React from 'react';
import styled from 'styled-components';

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

const GuffContentButton = styled.div`
    width: 177px;
    height: 177px;
    border-radius: 20px;
    background-color: ${props => props.color || 'blue'};
`;

const StyledSpan = styled.span`
    font-size: 20px;
    font-weight: 500;
`;

function GuffContent(props) {
    return (
        <div>
            <HeaderContainer>
                <HeaderTitle>기능 사용하기</HeaderTitle>
            </HeaderContainer>
            <ContentContainer>
                <ButtonContainer>
                    <GuffContentButton color="#E8F7F2" />
                    <StyledSpan>한글분석기</StyledSpan>
                </ButtonContainer>
                <ButtonContainer>
                    <GuffContentButton color="#F5EDFF" />
                    <StyledSpan>배터리 DB</StyledSpan>
                </ButtonContainer>
            </ContentContainer>
        </div>
    );
}

export default GuffContent;
