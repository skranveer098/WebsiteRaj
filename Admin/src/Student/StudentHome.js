import React from 'react';
import Header from '../components/Header';
import HomeDetail from '../StudentComponents/HomeDetail';

const StudentHome = () => {
    return (
        <div>
            <Header title="Student Panel" showNotifications={true} />
            <HomeDetail/>
        </div>
    )
};

export default StudentHome;
