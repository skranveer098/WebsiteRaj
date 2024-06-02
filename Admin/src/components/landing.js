// src/Landing.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style.css';
import logo from '../img/coachifylogo.png';
import { useNavigate } from 'react-router-dom'; 

function Landing() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container">
      <section className="section min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center py-4">
                <a href="#" className="logo d-flex align-items-center w-auto">
                  <img src={logo} alt="Coachify Logo" />
                </a>
              </div>
              <div className="card mb-3">
                <div className="card-body text-center">
                  <button className="btn btn-primary w-100 mb-3" onClick={goToLogin}>
                    Login As Admin
                  </button>
                  <button className="btn btn-secondary w-100" onClick={goToLogin}>
                    Login As Student
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Landing;
