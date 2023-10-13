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

export default function HomePage() {
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
        care
      </div>
    </div>
  );
}
