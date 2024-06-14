import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

function Nav() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [batch, setBatch] = useState({});
  const { batchId } = useParams();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const fetchBatchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:7000/api/batches/${batchId}`);
        console.log(response.data);
        setBatch(response.data);
      } catch (error) {
        console.error('Error fetching batch details:', error);
      }
    };

    fetchBatchDetails();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [batchId]);

  const navbarStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#b6b4df',
    padding: '10px',
    marginTop: '20px',
    marginBottom: '30px',
    marginLeft: '2vw',
    marginRight: '2vh',
    borderRadius: '10px',
    alignItems: 'center',
  };

  const adminPanelStyle = {
    color: 'black',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '8px 16px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold', // Added to make the text bold
  };

  const leftyStyle = {
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
  };

  const rightyStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <div style={navbarStyle}>
      <div style={leftyStyle}>
        <Link to={`/BatchDetail/${batchId}`} style={{ ...adminPanelStyle, backgroundColor: '#fff', color: '#000' }}>{batch.name}</Link>
      </div>
      <div style={{ flex: 1, textAlign: 'center' }}>
        <Link to="/admin/home" style={{ ...adminPanelStyle, marginLeft: '35vw', fontSize: '30px' }}>
          Admin Panel
        </Link>
      </div>
      <div style={rightyStyle}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ marginRight: '8px' }}
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M16 16s-1.5-2-4-2-4 2-4 2"></path>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12" y2="16"></line>
        </svg>
        <div style={{ ...adminPanelStyle, backgroundColor: '#4CAF50', color: '#fff' }}>User</div>
      </div>
    </div>
  );
}

export default Nav;
