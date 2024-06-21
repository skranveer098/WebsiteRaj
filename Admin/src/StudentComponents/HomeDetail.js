import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AP = process.env.REACT_APP_API_URL;

const HomeDetail = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [batchData, setBatchData] = useState({
    name: '',
    description: ''
  });
  const [studentData, setStudentData] = useState({
    firstName: '',
    lastName: '',
    enrollmentNo: '',
    emailId: '',
    startDate: '',
    endDate: '',
    batchId: '',
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Fetching data for username:', username); // Debug log
    const fetchStudentData = async () => {
      try {
        const response = await axios.get(`${AP}/api/student/username/${username}`);
        console.log('Fetched student data:', response.data); // Debug log
        setStudentData(response.data);
        const batchResponse = await axios.get(`${AP}/api/batches/${response.data.batchId}`);
        setBatchData(batchResponse.data);
      } catch (error) {
        console.error('Error fetching student data:', error); // Debug log
        setError('Failed to fetch student details');
      }
    };

    if (username) {
      fetchStudentData();
    }
  }, [username]);

  const handleScheduleClick = () => {
    navigate('/scheduler');
  };

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  if (!studentData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header" style={{ backgroundColor: '#007bff', color: 'white' }}>
              <h5>Batch Details</h5>
            </div>
            <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
              <p><strong>Batch Name:</strong> {batchData.name}</p>
              <p><strong>Start Date:</strong></p>
              <p><strong>End Date:</strong></p>
            </div>
          </div>
        </div>
        <div className="col-md-4 d-flex align-items-start justify-content-end">
          <button className="btn btn-primary mb-4" onClick={handleScheduleClick}>
            Class Schedule
          </button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header" style={{ backgroundColor: '#007bff', color: 'white' }}>
              <h5>Personal Details</h5>
            </div>
            <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
              <p><strong>Enrollment No:</strong> {studentData.enrollmentNo}</p>
              <p><strong>Name:</strong> {studentData.firstName} {studentData.lastName}</p>
              <p><strong>Email:</strong> {studentData.emailId}</p>
              <p><strong>Joining Date:</strong> {studentData.startDate}</p>
              <p><strong>Ending Date:</strong> {studentData.endDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeDetail;
