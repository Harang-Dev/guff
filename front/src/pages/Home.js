import React from 'react';
import Nav from '../components/Nav';
import Header from '../components/Header';
import GuffContent from '../components/GuffContent';
import GMECInfo from '../components/GMECInfo';
import GMECPR from '../components/GMECPR';
import GMECAsk from '../components/GMECAsk';
import Footer from '../components/Footer';

function Home(props) {
    return (
        <div>
            <Nav />
            <Header />
            <GuffContent />
            <GMECInfo />
            <GMECPR />
            <GMECAsk />
            <Footer />
        </div>
    );
}

export default Home;