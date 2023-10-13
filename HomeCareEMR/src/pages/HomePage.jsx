import React from 'react';

const navStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  backgroundColor: 'lightblue',
  padding: '10px',
};

const buttonStyle = {
  margin: '5px',
  padding: '5px 10px',
  backgroundColor: 'lightgray',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // Three equal columns
  gap: '20px', // Gap between grid items
  padding: '20px',
};

const gridItemStyle = {
  backgroundColor: 'lightblue',
  padding: '20px',
  border: '1px solid gray',
  borderRadius: '5px',
  transition: 'background-color 0.3s', // Smooth transition for hover effect
};

const gridItemHoverStyle = {
  backgroundColor: 'lightcoral', // New background color on hover
};

const footerStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'lightgray',
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
      <div style={{ marginTop: '60px' }}>
        <div style={gridContainerStyle}>
          <div style={{ ...gridItemStyle, ':hover': gridItemHoverStyle }}>Item 1</div>
          <div style={{ ...gridItemStyle, ':hover': gridItemHoverStyle }}>Item 2</div>
          <div style={{ ...gridItemStyle, ':hover': gridItemHoverStyle }}>Item 3</div>
          <div style={{ ...gridItemStyle, ':hover': gridItemHoverStyle }}>Item 4</div>
          <div style={{ ...gridItemStyle, ':hover': gridItemHoverStyle }}>Item 5</div>
          <div style={{ ...gridItemStyle, ':hover': gridItemHoverStyle }}>Item 6</div>
        </div>
        care
      </div>
      <footer style={footerStyle}>
        &copy; {currentYear} HomeCare EMR
      </footer>
    </div>
  );
}
