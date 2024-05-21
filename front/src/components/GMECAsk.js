import React from 'react';
import styled from 'styled-components';

const GMECAskContainer = styled.div`
    width: 1920px;
    height: 500px;
    margin-top: 141px;
    margin-bottom: 229px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const GMESAskContentBox = styled.div`
    width: 1581px;
    height: 500px;
    background-color: #F6F6F6;
    border-radius: 48px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const AskTextBox = styled.div`
    width: 680px;
    height: 500px;
    display: flex;
    flex-direction: column;
    margin-left: 57px;
`;

const StyledTitle = styled.span`
    font-size: 35px;
    font-weight: bold;
    margin-top: 54px;
`;

const StyledSpan = styled.span`
    font-size: 20px;
    font-weight: Medium;
    margin-top: 29px;
`;

const AskContentBox = styled.div`
    width: 747px;
    height: 500px;
    background-image: url('/media/image3.png');
    background-repeat: no-repeat;
`;


function GMECAsk(props) {
    return (
        <div>
            <GMECAskContainer>
                <GMESAskContentBox>
                    <AskTextBox>
                        <StyledTitle>궁금한건 바로바로 해결해요</StyledTitle>
                        <StyledSpan>궁금한게 있다면 바로 질문하고 답변 받을 수 있어요<br />언제든지 문제가 생기면 바로 담당자에게 문의해주세요</StyledSpan>
                    </AskTextBox>
                    <AskContentBox />
                </GMESAskContentBox>
            </GMECAskContainer>
        </div>
    );
}

export default GMECAsk;