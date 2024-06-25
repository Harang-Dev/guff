import React, { useEffect } from 'react';

import HomeComponent from '../components/home/HomeComponent';
import CustomLayout from '../components/layout/CustomLayout';

function Home(props) {

    return (
        <CustomLayout>
            <HomeComponent />
        </CustomLayout>
    );
}

export default Home;
