import React from 'react';

const footerStyle = {
  height: '50px',
  backgroundColor: '#737373',
  color: 'white',
  fontWeight: 'bold',
  flexShrink: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}

function Footer() {
  return (
    <footer style={footerStyle}>
      <p>
        Designed by Philip Tootill
      </p>
    </footer>
  );
}

export default Footer;
