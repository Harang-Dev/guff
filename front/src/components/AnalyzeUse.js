import React, { useState } from 'react';
import styled from 'styled-components';

const TabMenuContainer = styled.div`
  width: 100%;
  height: 146px;
  display: flex;
  justify-content: left;
  align-items: flex-end;
  margin-top: 50px;
  border-bottom: 2px black solid;
`;

const TabMenu = styled.ul`
  display: flex;
  list-style: none;
  margin-left: 200px;
`;

const TabItem = styled.li`
  margin: 0 30px;
  cursor: pointer;
`;

const TabMenuContentContainer = styled.div`
  width: 1920px;
  height: 880px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TabMenuContent = styled.div`
  width: 1560px;
  height: 672px;
  border-radius: 20px;
  border: 1px black solid;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
`;

function AnalyzeUse(props) {
    const [activeTab, setActiveTab] = useState('Step1');

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    return (
        <div>
            <TabMenuContainer>
                <TabMenu>
                    <TabItem onClick={() => handleTabClick('Step1')}>Step1</TabItem>
                    <TabItem onClick={() => handleTabClick('Step2')}>Step2</TabItem>
                    <TabItem onClick={() => handleTabClick('Step3')}>Step3</TabItem>
                    <TabItem onClick={() => handleTabClick('Step4')}>Step4</TabItem>
                </TabMenu>
            </TabMenuContainer>
            <TabMenuContentContainer>
                <TabMenuContent isVisible={activeTab === 'Step1'}><img src="./media/1.png" alt="Step 1" /></TabMenuContent>
                <TabMenuContent isVisible={activeTab === 'Step2'}><img src="./media/2.jpg" alt="Step 2" /></TabMenuContent>
                <TabMenuContent isVisible={activeTab === 'Step3'}><img src="./media/3.jpg" alt="Step 3" /></TabMenuContent>
                <TabMenuContent isVisible={activeTab === 'Step4'}><img src="./media/4.png" alt="Step 4" /></TabMenuContent>
            </TabMenuContentContainer>
        </div>
    );
}

export default AnalyzeUse;
