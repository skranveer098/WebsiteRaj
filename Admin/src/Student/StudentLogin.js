// src/components/StudentLogin.js
import React from 'react';
import Login from '../components/login';

const StudentLogin = () => {
  return (
    <div>
      <Login hideCreateAccountButton={true} />  // Pass the prop to hide the create account button
    </div>
  );
};

export default StudentLogin;
