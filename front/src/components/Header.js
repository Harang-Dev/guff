import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
    text-align: center;
    margin-top: 54px;
`;

const Title = styled.h1`
    font-size: 50px;
    margin-bottom: 10px;
    font-weight: bold;
`;

const Description = styled.span`
    display: block;
    margin-bottom: 10px;
    font-size: 25px;
`;

function Header() {
    return (
        <HeaderContainer>
            <Title>Tool for GMEC</Title>
            <Description>Guff는 GMEC문서 자동화 도구 입니다. Guff는 사용자 친화적인 인터페이스와 강력한 기능을 갖추고 있습니다.</Description>
            <Description>또한, Guff는 다양한 한글 형식과 스타일을 지원하여 사용자가 다양한 문서를 변환할 수 있도록 합니다.</Description>
        </HeaderContainer>
    );
}

export default Header;