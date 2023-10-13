import React from 'react';

const navStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: '#0055A4', // Professional blue color
  color: 'yellow', // White text for better contrast
  padding: '10px',
  display: 'flex',
  justifyContent: 'center',
};

const buttonStyle = {
  margin: '5px',
  padding: '10px 20px',
  backgroundColor: 'white', // Light blue background
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  color: 'yellow', // White text
  fontWeight: 'bold', // Bold text
  textDecoration: 'none',
};

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: '20px',
  padding: '20px',
};

const gridItemStyle = {
  backgroundColor: 'white',
  padding: '20px',
  border: '1px solid #E0E0E0', // Light gray border
  borderRadius: '5px',
  transition: 'background-color 0.3s',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Subtle box shadow
};

const gridItemHoverStyle = {
  backgroundColor: '#F0F0F0', // Light gray background on hover
};

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#0055A4', // Match the top navigation bar
  color: 'white',
  padding: '10px',
  textAlign: 'center',
};

export default function HomePage() {
  const currentYear = new Date().getFullYear();

  return (
    <div>
      <nav style={navStyle}>
        <button style={buttonStyle}>
          <a href="/">Home</a>
        </button>
        <button style={buttonStyle}>
          <a href="/about">About</a>
        </button>
        <button style={buttonStyle}>
          <a href="/contact">Contact</a>
        </button>
      </nav>
      <div style={{ marginTop: '80px' }}>
        <div style={gridContainerStyle}>
          <div style={{ ...gridItemStyle, ...gridItemHoverStyle }}>
            <h2>Services</h2>
            <p>We offer a wide range of medical services to cater to your needs.</p>
          </div>
          <div style={{ ...gridItemStyle, ...gridItemHoverStyle }}>
            <h2>Doctors</h2>
            <p>Meet our experienced and dedicated medical professionals.</p>
          </div>
          <div style={{ ...gridItemStyle, ...gridItemHoverStyle }}>
            <h2>Appointments</h2>
            <p>Schedule an appointment and receive quality healthcare.</p>
          </div>
        </div>
        <p style={{ textAlign: 'center', marginTop: '20px' }}>
          We are committed to your well-being.
        </p>
      </div>
      <footer style={footerStyle}>
        &copy; {currentYear} HomeCare EMR
      </footer>
    </div>
  );
}
