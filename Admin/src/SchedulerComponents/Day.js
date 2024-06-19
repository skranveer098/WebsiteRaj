import React from 'react';

const SelectedDate = ({ date }) => {
  return (
    <div style={{ padding: '10px', backgroundColor: '#fff', marginBottom: '10px', borderRadius: '5px', boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)' }}>
      <p style={{ fontWeight: 'bold', margin: '0' }}>Selected Date:</p>
      <p style={{ margin: '0' }}>{date}</p>
    </div>
  );
};

export default SelectedDate;
