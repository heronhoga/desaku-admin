import React from 'react'
import { Navbar } from '../components/Navbar'
import '../views/styles/Home.css';
import { useEffect, useState } from 'react';

function Home() {

  const [total, setTotal] = useState(0);

useEffect(() => {
  const fetchData = async (url) => {
    const response = await fetch(url, {
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      try {
        const data = await response.json();
        console.log(data.data);
        
        setTotal(data.data.length);

        return data.data;
      } catch (error) {
        console.error("Error parsing JSON!", error);
      }
    } else {
      console.error("This is not JSON!");
    }
  };

  fetchData('http://localhost:8080/admin/warga', {
    credentials: 'include',
  });
}, []);

  return (
    
    <div className="homeNav">
      
      <Navbar/>
      <br></br>
      <br></br>
      <h1>Selamat datang di</h1>
      <h1>DESAKU WEBSITE - ADMIN</h1>
      <img src={"https://storage.googleapis.com/desaku-images/desakulogo.png"} alt="desaku" className='desakuimg'></img>
      <h2>Saat ini sudah ada {total} data warga yang terdaftar</h2>
      <h2>di sistem Desaku</h2>
      
    </div>
  );
}

export default Home;

