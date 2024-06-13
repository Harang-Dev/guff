import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CenteredContainer = styled.div`
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding-bottom: 66px;
    background: linear-gradient(to bottom, #CEF3FF 50%, #FFFFFF 50%);
`;

const Header = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 20px;
`;

const TableHeader = styled.div`
    display: grid;
    width: 1595px;
    height: 40px;
    grid-template-columns: 181px 223px 241px 223px 247px 177px 201px;
    text-align: center;
    color: #7E8393;
    margin-top: 40px;
`;

const TableBodyContainer = styled.ul`
    background-color: #fff;
    border-radius: 15px;
    width: 100%;
    max-width: 1595px;
    padding: 0;
    margin-bottom: 20px;
`;

const TableBody = styled.li`
    display: grid;
    grid-template-columns: 181px 223px 241px 223px 247px 177px 201px;
    text-align: center;
    color: black;
    list-style: none;
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;  
    &:hover {
        background-color: #F9FBFB;
    }
`;

const MoreButton = styled.button`
    width: 100%;
    max-width: 1595px;
    height: 60px;
    background-color: white;
    border: none;
    cursor: pointer;
    color: #8991EE;
    font-weight: bold;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

const TabMenu = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const TabButton = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    background-color: ${({ active }) => (active ? '#CEF3FF' : '#fff')};
    border: none;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    color: ${({ active }) => (active ? '#333' : '#7E8393')};
`;

const AnalyzeSimple = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const [visibleItems, setVisibleItems] = useState(10);
    const [activeTab, setActiveTab] = useState('');
    const [version, setVersion] = useState([]);

    useEffect(() => {
        const fetchTabData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:8000/parser/locations/${location.state.version}`);
                setVersion(response.data);

                // Automatically select the first tab menu item on load
                if (response.data.length > 0) {
                    handleClick(response.data[0]);
                }
            } catch (error) {
                console.error('Error fetching tab data:', error);
            }
        };

        fetchTabData();
    }, [location.state.version]);

    const handleClick = async (item) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/parser/location/${item.location_name}?version=${location.state.version}`);
            setData(response.data);
            console.log(response.data);
            setActiveTab(item.location_name);
        } catch (error) {
            console.error('Error fetching tab data:', error);
        }
    };

    const loadMore = () => {
        setVisibleItems(prev => prev + 5);
    };

    const allItemsLoaded = visibleItems >= data.length;

    return (
        <CenteredContainer>
            <TabMenu>
                {version.map((item, index) => (
                    <TabButton key={index} onClick={() => handleClick(item)} active={activeTab === item.location_name}>
                        {item.location_name}
                    </TabButton>
                ))}
            </TabMenu>
            <Header>
                <TableHeader>
                    <p>일시</p>
                    <p>진동속도 최저치</p>
                    <p>진동속도 최고치</p>
                    <p>진동레벨 최저치</p>
                    <p>진동레벨 최고치</p>
                    <p>소음 최저치</p>
                    <p>소음 최고치</p>
                </TableHeader>
            </Header>
            <TableBodyContainer>
                {data.slice(0, visibleItems).map((item, index) => (
                    <TableBody key={index}>
                        <p>{item['일시']}</p>
                        <p>{item['진동속도(cm/s) 최저치']}</p>
                        <p>{item['진동속도(cm/s) 최고치']}</p>
                        <p>{item['진동레벨[dB(V)] 최저치']}</p>
                        <p>{item['진동레벨[dB(V)] 최고치']}</p>
                        <p>{item['소음[dB(A)] 최저치']}</p>
                        <p>{item['소음[dB(A)] 최고치']}</p>
                    </TableBody>
                ))}
                {allItemsLoaded && (
                    <>
                        <TableBody>
                            <p>Min</p>
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                            <p>4</p>
                            <p>5</p>
                            <p>6</p>
                        </TableBody>
                        <TableBody>
                            <p>Max</p>
                            <p>1</p>
                            <p>2</p>
                            <p>3</p>
                            <p>4</p>
                            <p>5</p>
                            <p>6</p>
                        </TableBody>
                    </>
                )}
                {!allItemsLoaded && (
                    <MoreButton onClick={loadMore}>더 보기</MoreButton>
                )}
            </TableBodyContainer>
        </CenteredContainer>
    );
};

export default AnalyzeSimple;
