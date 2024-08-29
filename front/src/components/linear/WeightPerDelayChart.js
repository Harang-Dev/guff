import React, { useState, useEffect, useRef } from 'react';
import { Button, Space, Tabs, Row, Col, Divider, Card, Table, Input } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import axios from 'axios';
import EditableTable from '../layout/EditableTable';

const WieghtPerDelayChart = ({ columns, dataSource, onSave }) => {
    const [status, setStatus] = useState(null);

    const InitColumns = [
        {
            title: ''
        }

    ]

    return (
        status? null : <Row><Col><Input></Input></Col></Row>
    )
}

export default WieghtPerDelayChart;