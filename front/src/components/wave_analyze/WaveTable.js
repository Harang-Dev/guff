import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Space } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import html2canvas from 'html2canvas';
import WaveModal from './WaveModal';

const WaveTable = () => {
    const location = useLocation();
    const { filename } = location.state || {};
    const [ismodal, setIsModal] = useState(false);

    const handleDownload = (containerID, fileName) => {
        const chartElement = document.getElementById(containerID);
        html2canvas(chartElement).then((canvas) => {
          const link = document.createElement('a');
          link.download = fileName;
          link.href = canvas.toDataURL();
          link.click();
        });
    };
    
    const showModal = () => {
        setIsModal(true);
    }

    const cancelModal = () => {
        setIsModal(false);
    }

    return (
        <div>
            <Space style={{display: 'flex', justifyContent: 'flex-end'}}>
                <Button type="primary" icon={<PlusOutlined/>}onClick={() => (handleDownload('ppv-container', 'PPV Graph'))} >PPV Download</Button>
                <Button type="primary" icon={<PlusOutlined/>}onClick={() => (handleDownload('xyz-container', 'XYZ Graph'))}>XYZ Download</Button>
                <Button type="primary" onClick={showModal}>통계 요약</Button>
            </Space>
            <WaveModal 
                open={ismodal}
                onCancel={cancelModal}
                item={filename}
            />
        </div>

    );
}

export default WaveTable