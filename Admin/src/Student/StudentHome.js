import React from 'react';
// import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import HomeDetail from '../StudentComponents/HomeDetail';
import { useParams } from 'react-router-dom';

const StudentHome = () => {
    // const location = useLocation();
     const { batchId } = useParams();

    return (
        <div>
            <Header title="Student Panel" showNotifications={true} />
            <HomeDetail batchId={ batchId} />
        </div>
    );
};

export default StudentHome;
