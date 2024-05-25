import React from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InspectionContainer = styled.div`
    width: 692px;
    height: 712px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 100px;
`;

const ImageContainer = styled.div`
    width: 372px;
    height: 357px;
    background-image: url('/media/warning.png');
    background-repeat: no-repeat;
    background-size: cover;
`;

const InspectContent = styled.div`
    width: 692px;
    height: 113px;
    color: #FFFFFF;
    font-size: 20px;
    text-align: center;
`;

const RedText = styled.span`
    font-size: 35px;
    font-weight: bold;
    color: red;
`;

const InspectButton = styled.button`
    width: 472px;
    height: 93px;
    background-color: #BE35FF;
    border-radius: 37px;
    color: #FFFFFF;
    font-size: 40px;
    cursor: pointer;
`;

function AdminInspection(props) {
    return (
        <div>
            <CenteredContainer>
                <InspectionContainer>
                    <ImageContainer />
                    <InspectContent>
                        <span>점검 시작하기 버튼을 누르는 순간부터 </span>
                        <RedText>즉시</RedText>
                        <span> 점검이 시작됩니다<br /><br />한번 더 생각하고 눌러주세요</span>
                    </InspectContent>
                    <InspectButton>점검 시작하기</InspectButton>
                </InspectionContainer>
            </CenteredContainer>
        </div>
    );
}

export default AdminInspection;
