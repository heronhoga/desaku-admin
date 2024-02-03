import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './styles/Navbar.css';


export const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
  try {
    const response = await fetch('http://localhost:8080/admin/logout', {
      method: 'GET',
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error('Failed to logout');
    }

    // Delete all cookies
    document.cookie.split(";").forEach((cookie) => {
      document.cookie = cookie
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/");
    });

    navigate("/", { replace: true });
  } catch (error) {
    console.error('Failed to logout', error);
  }
};

  return (
    <>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
        integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
        crossOrigin="anonymous"
      />
      <nav>
        <ul>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/warga">Warga</Link></li>
          <li><Link to="/listrik">Listrik</Link></li>
          <li><Link to="/pajak">Pajak</Link></li>
          <li><Link to="/wifi">Wifi</Link></li>
          <li><Link to="/iuran">Iuran</Link></li>
          <li><Link to="/epasar">E-Pasar</Link></li>
          <li><Link to="/artikel">Artikel</Link></li>
          <li className='logout'>
            <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  )
}

