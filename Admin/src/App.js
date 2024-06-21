import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Home from './Home';
import ProfilePage from './sidebarSection/ProfilePage';
import BatchDetail from './sidebarSection/BatchDetail';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import StudentLogin from './Student/StudentLogin';
import StudentHome from './Student/StudentHome';
import ScheduleHome from './Scheduler/SchedulerHome';
import { DateProvider } from './SchedulerComponents/DateContext';
import Scheduler from './StudentComponents/Scheduler';

const App = () => {
  return (
    <DateProvider>
      <Routes>
        <Route path="/" element={<StudentLogin />} />
        <Route path="/home/:username" element={<StudentHome />} />
        <Route path="/scheduler" element={<Scheduler />} />
        <Route path="/admin" element={<Login />} />
        <Route path="/admin/home" element={<Home />} />
        <Route path="/ProfilePage" element={<ProfilePage />} />
        <Route path="/BatchDetail/:batchId" element={<BatchDetail />} />
        <Route path="/schedule/:batchId" element={<ScheduleHome />} />
      </Routes>
    </DateProvider>
  );
}

export default App;
