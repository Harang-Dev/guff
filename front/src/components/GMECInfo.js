import React from 'react';
import styled from 'styled-components';

const GMECInfoContainer = styled.div`
    width: 1920px;
    height: 700px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 266px;
    text-align: center;
`;

const StyledSpan = styled.span`
    color: #8F00FF;
    font-weight: bold;
`;

const GMECHeader = styled.h1`
    font-size: 50px;
    font-weight: bold;
`;

const GMECContentContaienr = styled.div`
    width: 989px;
    height: 500px;
    background-color: #E8F7F2;
    border-radius: 48px;
`;

function GMECInfo(props) {
    return (
        <div>
            <GMECInfoContainer>
                <StyledSpan>GMEC란?</StyledSpan>
                <GMECHeader>GMEC는 이런저런 회사입니다.<br />이런거 저런거를 주로 처리해요.</GMECHeader>
                <GMECContentContaienr />
            </GMECInfoContainer>
        </div>
    );
}

export default GMECInfo;