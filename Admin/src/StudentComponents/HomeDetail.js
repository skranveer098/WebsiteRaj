import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const HomeDetail = () => {
  const batchDetails = {
    name: "Batch A",
    startDate: "2023-01-10",
    endDate: "2023-12-20",
  };

  const schedule = [
    { day: "Monday", time: "10:00 AM - 12:00 PM" },
    { day: "Wednesday", time: "2:00 PM - 4:00 PM" },
    { day: "Friday", time: "1:00 PM - 3:00 PM" },
  ];

  const ongoingChapters = [
    { chapter: "Introduction to React", status: "In Progress" },
    { chapter: "State and Props", status: "Not Started" },
    { chapter: "Lifecycle Methods", status: "Not Started" },
  ];

  const personalDetails = {
    enrollmentNo: "123456789",
    name: "John Doe",
    email: "john.doe@example.com",
    joiningDate: "2023-01-01",
    endingDate: "2023-12-31",
  };

  return (
    <div className="container" style={{ marginTop: '100px' }}>
      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header" style={{ backgroundColor: '#007bff', color: 'white' }}>
              <h5>Batch Details</h5>
            </div>
            <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
              <p><strong>Batch Name:</strong> {batchDetails.name}</p>
              <p><strong>Start Date:</strong> {batchDetails.startDate}</p>
              <p><strong>End Date:</strong> {batchDetails.endDate}</p>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header" style={{ backgroundColor: '#007bff', color: 'white' }}>
              <h5>Schedule</h5>
            </div>
            <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
              <ul className="list-group list-group-flush">
                {schedule.map((item, index) => (
                  <li key={index} className="list-group-item" style={{ backgroundColor: '#ffffff', borderTop: index !== 0 ? '1px solid #dee2e6' : 'none' }}>
                    <strong>{item.day}:</strong> {item.time}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header" style={{ backgroundColor: '#007bff', color: 'white' }}>
              <h5>Ongoing Chapters</h5>
            </div>
            <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
              <ul className="list-group list-group-flush">
                {ongoingChapters.map((item, index) => (
                  <li key={index} className="list-group-item" style={{ backgroundColor: '#ffffff', borderTop: index !== 0 ? '1px solid #dee2e6' : 'none' }}>
                    <strong>{item.chapter}:</strong> {item.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-header" style={{ backgroundColor: '#007bff', color: 'white' }}>
              <h5>Personal Details</h5>
            </div>
            <div className="card-body" style={{ backgroundColor: '#f8f9fa' }}>
              <p><strong>Enrollment No:</strong> {personalDetails.enrollmentNo}</p>
              <p><strong>Name:</strong> {personalDetails.name}</p>
              <p><strong>Email:</strong> {personalDetails.email}</p>
              <p><strong>Joining Date:</strong> {personalDetails.joiningDate}</p>
              <p><strong>Ending Date:</strong> {personalDetails.endingDate}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeDetail;
