import React, { useState } from 'react';
import '../CSS/HomePage.css';

export default function HomePage() {
  const currentYear = new Date().getFullYear();
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div>
      <button className="toggle-button" onClick={toggleSidebar}>
        Toggle Sidebar
      </button>
      <div className="content">
        <div
          className={`sidebar ${sidebarVisible ? 'visible' : 'hidden'}`}
        >
          <h3>Sidebar</h3>
          <ul>
            <li>
              <a href="/services">Services</a>
            </li>
            <li>
              <a href="/doctors">Doctors</a>
            </li>
            <li>
              <a href="/appointments">Appointments</a>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <div className="header">
            <h1>Welcome to HomeCare EMR</h1>
            <p>Your Trusted Partner in Healthcare ♥️</p>
          </div>
          <div className="grid-container">
            <div className="grid-item">
              <h2>Services</h2>
              <p>We offer a wide range of medical services to cater to your needs.</p>
            </div>
            <div className="grid-item">
              <h2>Doctors</h2>
              <p>Meet our experienced and dedicated medical professionals.</p>
            </div>
            <div className="grid-item">
              <h2>Appointments</h2>
              <p>Schedule an appointment and receive quality healthcare.</p>
            </div>
          </div>
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            We are committed to your well-being.
          </p>
        </div>
      </div>
      <footer className="footer">
        &copy; {currentYear} HomeCare EMR
      </footer>
    </div>
  );
}
