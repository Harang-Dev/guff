import React from 'react';
import styled from 'styled-components';

const NoticeHeaderContainer = styled.div`
    width: 1642px;
    height: 125px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    margin-top: 80px;
`;

const HeaderContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 1642px;
    height: 48px;
    padding: 0 20px;
`;

const HeaderSymbol = styled.div`
    width: 28px;
    height: 30px;
    background-image: url('media/Symbol.png');
    background-repeat: no-repeat;
    background-size: contain;
    margin-right: 20px;
`;

const StyledSpan = styled.span`
    font-size: 35px;
    font-weight: bold;
    color: #ffffff;
`;

const SearchContainer = styled.div`
    width: 1642px;
    height: 55px;
    display: flex;
`;

const SelectBox = styled.select`
    width: 120px;
    height: 40px;
    font-size: 16px;
    margin-right: 10px;
`;

const SearchInput = styled.input`
    width: 452px;
    height: 35px;
    font-size: 16px;
`;

const SearchButton = styled.button`
    width: 87px;
    height: 40px;
    background-color: #BE35FF;
    color: #ffffff;
    margin-left: 100px;
    cursor: pointer;
`;

function AdminNoticeHeader(props) {
    return (
        <div>
            <NoticeHeaderContainer>
                <HeaderContainer>
                    <HeaderSymbol />
                    <StyledSpan>공지사항 관리</StyledSpan>
                </HeaderContainer>
                <SearchContainer>
                    <SelectBox>
                        <option value="title">제목</option>
                        <option value="author">작성자</option>
                    </SelectBox>
                    <SearchInput type="text" placeholder="검색어를 입력하세요" />
                    <SearchButton>검색</SearchButton>
                </SearchContainer>
            </NoticeHeaderContainer>
        </div>
    );
}

export default AdminNoticeHeader;
