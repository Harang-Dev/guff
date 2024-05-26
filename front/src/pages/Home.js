import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styled from 'styled-components';

import Header from '../components/Header';
import GuffContent from '../components/GuffContent';
import GMECInfo from '../components/GMECInfo';
import GMECPR from '../components/GMECPR';
import GMECAsk from '../components/GMECAsk';

const StyledSection = styled.div`
    &[data-aos="fade-up"] {
        opacity: 0;
        transition-duration: 1s;
        transition-delay: 0.3s;
    }

    &.aos-animate {
        opacity: 1; 
    }
`;

function Home(props) {
    useEffect(() => {
        AOS.init({ duration: 1000 });
        AOS.refresh();
    }, []);

    return (
        <div>
            <Header />
            <GuffContent />
            <StyledSection data-aos="fade-up">
                <GMECInfo />
            </StyledSection>
            <StyledSection data-aos="fade-up">
                <GMECPR />
            </StyledSection>
            <StyledSection data-aos="fade-up">
                <GMECAsk />
            </StyledSection>
        </div>
    );
}

export default Home;
