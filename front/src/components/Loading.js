import React from 'react';
import styled from 'styled-components';

const LoadingOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
`;

const LoadingSpinner = styled.div`
    border: 8px solid #f3f3f3;
    border-top: 8px solid #3498db;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    animation: spin 2s linear infinite;

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

const LoadingText = styled.p`
    margin-top: 20px;
    font-size: 30px;
    font-weight: bold;
    color: red;
    animation: blink 1.5s step-start infinite;

    @keyframes blink {
        50% {
            opacity: 0;
        }
    }
`;

function Loading() {
    return (
        <LoadingOverlay>
            <LoadingSpinner />
            <LoadingText>분석 중입니다 ...</LoadingText>
        </LoadingOverlay>
    );
}

export default Loading;
