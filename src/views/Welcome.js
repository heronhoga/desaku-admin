import React from "react";
import { Link } from 'react-router-dom';
import Button from "../components/Button";
import '../views/styles/Welcome.css';

function Welcome() {
  return (
    <div>
      <img src={"https://storage.googleapis.com/desaku-images/WelcomeImage.jpg"} alt="welcome"></img>
      <h1 className="title">DESAKU DASHBOARD ADMIN</h1>
      <Link to="/login"><Button>LOGIN</Button></Link>
    </div>
  );
}

export default Welcome;
