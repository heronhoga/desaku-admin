import React from 'react';
import './styles/Button.css';

const Button = ({ onClick, children, ...props }) => {
  return (
    <button className="custom-button" onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
