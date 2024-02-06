import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./styles/EditArtikel.css";

function EditArtikel() {
  const navigate = useNavigate();
  const [artikelData, setArtikelData] = useState({
    judul: '',
    isi: '',
  });
  const { id_artikel } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/artikel/${id_artikel}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        if (jsonData.data) {
          setArtikelData(jsonData.data);
        } else {
          console.error('Invalid API response format:', jsonData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id_artikel]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/artikel/${id_artikel}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(artikelData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate('/artikel', { replace: true });
    } catch (error) {
      console.error('Error updating Artikel data:', error);
    }
  };

  const handleBack = () => {
    navigate('/artikel', { replace: true });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Edit Artikel</h5>

        <form>
          <div className="mb-3">
            <label htmlFor="judul" className="form-label">Judul</label>
            <input
              type="text"
              className="form-control"
              id="judul"
              value={artikelData.judul}
              onChange={(e) => setArtikelData({ ...artikelData, judul: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="isi" className="form-label">Isi</label>
            <textarea
              className="form-control"
              id="isi"
              value={artikelData.isi}
              onChange={(e) => setArtikelData({ ...artikelData, isi: e.target.value })}
            ></textarea>
          </div>

          <div className="buttons">
            <button type="button" className="btn btn-primary" onClick={handleUpdate}>
              Update
            </button>

            <button type="button" className="btn btn-back backBtn" onClick={handleBack}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditArtikel;
