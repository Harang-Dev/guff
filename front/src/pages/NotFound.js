import React  from 'react';
import { Link } from 'react-router-dom';

import CustomLayout from '../components/layout/CustomLayout';
import { Result, Button } from 'antd';

const NotFound = () => {
    return (
        <CustomLayout>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={
                <Link to={"/"}>
                    <Button type="primary">Back Home</Button>
                </Link>
                }
            />
        </CustomLayout>
    );
}

export default NotFound;