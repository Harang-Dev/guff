import React from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    width: 1920px;
    height: 78px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding-left: 200px;
    margin-top: 50px;
`;

const StyledButton = styled.button`
    width: 145px;
    height: 38px;
    text-align: center;
    background-color: #ffffff;
    border: 2px black solid;
    border-radius: 20px;
    margin-right: 20px;
    
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
`;



function AssetButton(props) {
    return (
        <div>
            <ButtonContainer>
                <StyledButton>제조 회사</StyledButton>
                <StyledButton>hb</StyledButton>
                <StyledButton>instantel</StyledButton>
            </ButtonContainer>
        </div>
    );
}

export default AssetButton;