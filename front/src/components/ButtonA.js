import React, { useState } from 'react';
import styled from 'styled-components';

const Button1 = styled.button`
    width: 10vw;
    height: 10vw;
    background-color: red;
`;

function ButtonA(props) {
    const [response, setResponse] = useState(null); // 서버 응답을 저장할 상태

    const handleClick = () => {
        const dataToSend = { key: 'value' }; // 서버로 보낼 데이터 객체

        fetch('http://127.0.0.1:8000/battery/', {
            method: 'POST', // 요청 방식은 POST
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataToSend) // 데이터를 JSON 문자열로 변환하여 전송
        })
        .then(response => response.json())
        .then(data => {
            setResponse(data); // 받은 데이터를 상태에 저장
            console.log('Success:', data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <Button1 onClick={handleClick}><span>버튼</span></Button1>
            {response && (
                <div>
                    <h3>받은 데이터:</h3>
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}

export default ButtonA;
