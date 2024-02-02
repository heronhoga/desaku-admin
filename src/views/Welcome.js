import React from "react";
import { Link } from 'react-router-dom';
import Button from "../components/Button";

function Welcome() {
  return (
    <div>
      <img src="/src/images/WelcomeImage.jpg" alt="welcome"></img>
      
      <Link to="/login"><Button>Login</Button></Link>
    </div>
  );
}

export default Welcome;
