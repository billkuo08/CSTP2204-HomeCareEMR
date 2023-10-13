import React from 'react';

<<<<<<< HEAD
=======
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
};
>>>>>>> d9f8d9b (added basic grid for categories)
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
<<<<<<< HEAD
    </div>
=======

      <div>
      <nav style={navStyle}>
        {/* Your navigation buttons here */}
      </nav>
      <div style={{ marginTop: '60px' }}>
        <div style={gridContainerStyle}>
          <div style={gridItemStyle}>Item 1</div>
          <div style={gridItemStyle}>Item 2</div>
          <div style={gridItemStyle}>Item 3</div>
          <div style={gridItemStyle}>Item 4</div>
          <div style={gridItemStyle}>Item 5</div>
          <div style={gridItemStyle}>Item 6</div>
        </div>
        care
      </div>
    </div>
    </div>

    
>>>>>>> d9f8d9b (added basic grid for categories)
  );
}
