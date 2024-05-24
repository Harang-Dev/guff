import React from 'react';
import styled from 'styled-components';

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoginContainer = styled.div`
    width: 523px;
    height: 384px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-top: 234px;
`;

const LogoContainer = styled.div`
    width: 381px;
    height: 111px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: url('/media/loginlogo.png');
    background-size: cover;
    background-repeat: no-repeat;
`;

const IDContainer = styled.input`
    width: 522px;
    height: 62px;
    background-color: #33353A;
    border: 3px #42464D solid;
    border-radius: 12px;
    color: #AEAEAE;
    font-size: 20px;
    font-weight: bold;
`;

const PWContainer = styled.input`
    width: 522px;
    height: 62px;
    background-color: #33353A;
    border: 3px #42464D solid;
    border-radius: 12px;
    color: #AEAEAE;
    font-size: 20px;
    font-weight: bold;
`;

const LoginButton = styled.button`
    width: 522px;
    height: 65px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(to right, #5865F2, #7F45DD);
    color: #FFFFFF;
    border-radius: 12px;
`;

function LoginForm(props) {
    return (
        <div>
            <CenteredContainer>
                <LoginContainer>
                    <LogoContainer />
                    <IDContainer placeholder='이메일' />
                    <PWContainer type = 'password' placeholder='비밀번호' />
                    <LoginButton><span>로그인</span></LoginButton>
                </LoginContainer>
            </CenteredContainer>
        </div>
    );
}

export default LoginForm;