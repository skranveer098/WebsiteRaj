import React, { useState, useEffect, useContext } from 'react';
import Nav from '../SchedulerComponents/Nav';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Calendar from '../SchedulerComponents/Calender';
import { BatchContext } from '../ContextApi/BatchContext'
import Scroll from '../SchedulerComponents/Scroll'; // Adjust the path as necessary

const AP = process.env.REACT_APP_API_URL;

const Scheduler = () => {
  const { username } = useParams();
  const [selectedDate, setSelectedDate] = useState(null);
  const [scheduleData, setScheduleData] = useState([]);
  const { batchData } = useContext(BatchContext);
  const [joinDate, setJoinDate] = useState(null); // Initialize joinDate state
  const [studentName, setStudentName] = useState({
    firstName: '',
    lastName: '',
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${AP}/api/student/username/${username}`);
        console.log(response.data.startDate)
        setStudentName(response.data);
        setJoinDate(response.data.startDate); // Set joinDate from fetched data
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
  const date=`${batchData.startDate}`

  return (
    <div>
      <Nav studentName={fullName} panelType="student" />
      <Calendar onDateClick={handleDateClick} joiningDate={joinDate} batchStartDate={date}/>
      <Scroll showbar={false} />
    </div>
  );
};

export default Scheduler;
