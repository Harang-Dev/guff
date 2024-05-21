import React from 'react';
import styled from 'styled-components';

const GMECPRContainer = styled.div`
    width: 1920px;
    height: 737px;
    margin-top: 171px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledSpan = styled.span`
    color: #8F00FF;
    font-weight: bold;
`;

const GMECHeader = styled.h1`
    font-size: 50px;
    font-weight: bold;
    text-align: center;
`;

const GMECPRContentContainer = styled.div`
    width: 1920px;
    height: 500px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`;

const GMECPRFirstBox = styled.div`
    width: 484px;
    height: 500px;
    background-color: #F5EDFF;
    margin-left: 170px;
    border-radius: 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: left;
`;

const GMECPRSecondtBox = styled.div`
    width: 989px;
    height: 500px;
    background-color: #E8F7F2;
    margin-left: 108px;
    border-radius: 48px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    text-align: left;
`;

const TextContaienr = styled.div`
    text-align: left;
    padding-right: 60px;
`;

const SeconTextContainer = styled.div`
    text-align: left;
    padding-right: 320px;
`;

const ContentHeader = styled.h2`
    font-size: 30px;
    font-weight: bold;
`;

const ContentText = styled.span`
    font-size: 20px;
    font-weight: Medium;
`;

const FirstContnetBox = styled.div`
    width: 402px;
    height: 308px;
    border-radius: 23px 23px 0 0;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: 1px solid black;
    border-width: 3px 9px 0 1px;
`;

const SecondContnetBox = styled.div`
    width: 861px;
    height: 308px;
    border-radius: 23px 23px 0 0;
    background-color: #ffffff;
    display: flex;
    justify-content: center;
    align-items: flex-end;
    border: 1px solid black;
    border-width: 3px 9px 0 1px;
`;

const FImageBox = styled.div`
    width: 342px;
    height: 271px;
    background-image: url('/media/image1.png');
    background-repeat: no-repeat;
    border: 1px black solid;
    border-bottom: none;
`;

const SImageBox = styled.div`
    width: 788px;
    height: 279px;
    background-image: url('/media/image2.png');
    background-repeat: no-repeat;
    border: 1px black solid;
    border-bottom: none;
`;

function GMECPR(props) {
    return (
        <div>
            <GMECPRContainer>
                <StyledSpan>기능설명</StyledSpan>
                <GMECHeader>GUFF 에서는 누구나<br />쉽고 간결하게 분석할 수 있어요.</GMECHeader>
                <GMECPRContentContainer>
                    <GMECPRFirstBox>
                        <TextContaienr>
                            <ContentHeader>필요한 열만 고르기</ContentHeader>
                            <ContentText>꼭 필요한 열만 뽑아서 보여줘요<br />보고싶은 내용만 골라서 볼 수 있어요</ContentText>
                        </TextContaienr>
                        <FirstContnetBox>
                            <FImageBox />
                        </FirstContnetBox>
                    </GMECPRFirstBox>
                    <GMECPRSecondtBox>
                        <SeconTextContainer>
                        <ContentHeader>즉시 필요한 값 수정을 자유롭고 편하게</ContentHeader>
                        <ContentText>급하게 수정 하고 싶은 값들이 있다면<br />빠르고 간편하게 추가/수정/삭제/저장이 가능해요</ContentText>
                        </SeconTextContainer>
                        <SecondContnetBox>
                            <SImageBox />
                        </SecondContnetBox>
                    </GMECPRSecondtBox>
                </GMECPRContentContainer>
            </GMECPRContainer>
        </div>
    );
}

export default GMECPR;