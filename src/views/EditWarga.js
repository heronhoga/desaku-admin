import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import WargaCard from '../components/WargaCard';

function EditWarga() {
  const { id } = useParams();
  const [wargaData, setWargaData] = useState(null);

  useEffect(() => {
    const fetchWargaData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/warga/${id}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();
        setWargaData(jsonData.data);
      } catch (error) {
        console.error('Error fetching warga data:', error.message);
      }
    };

    fetchWargaData();
  }, [id]);

  return (
    <div>
      {wargaData ? <WargaCard data={wargaData} /> : <p>Loading...</p>}
    </div>
  );
}

export default EditWarga;
