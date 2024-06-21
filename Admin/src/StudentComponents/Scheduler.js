import React, { useState, useEffect } from 'react';
import Nav from '../SchedulerComponents/Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Calender from '../SchedulerComponents/Calender'
import Scroll from '../SchedulerComponents/Scroll';

const AP = process.env.REACT_APP_API_URL;

const Scheduler = () => {
  const { username } = useParams();
    const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const [studentName, setStudentName] = useState({
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${AP}/api/student/username/${username}`);
        setStudentName(response.data);
      } catch (error) {
        console.error('Failed to fetch student details:', error);
      }
    };

    if (username) {
      fetchStudentData();
    }
  }, [username]);

    const fetchScheduleData = async (date) => {
    try {
      const response = await axios.get(`${AP}/api/schedule/${date}`);
      setScheduleData(response.data);
    } catch (error) {
      console.error('Failed to fetch schedule:', error);
    }
  };

    const handleDateClick = (date) => {
    setSelectedDate(date);
    fetchScheduleData(date);
  };

  const fullName = `${studentName.firstName} ${studentName.lastName}`;

  return (
    <div>
      <Nav studentName={fullName} panelType="student" />
      <Calender onDateClick={handleDateClick} />
      <Scroll showbar={false}/>
    </div>
  );
};

export default Scheduler;
