import React from 'react';
import '../CSS/HomePage.css';

export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <nav className="nav">
        <button className="button">
          <a href="/">Home</a>
        </button>
        <button className="button">
          <a href="/about">About</a>
        </button>
        <button className="button">
          <a href="/contact">Contact</a>
        </button>
      </nav>
      <div className="header">
        <h1>Welcome to HomeCare EMR</h1>
        <p>Your Trusted Partner in Healthcare ♥️</p>
      </div>
      <div style={{ marginTop: '20px' }}>
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
      <footer className="footer">
        &copy; {currentYear} HomeCare EMR
      </footer>
    </div>
  );
}
