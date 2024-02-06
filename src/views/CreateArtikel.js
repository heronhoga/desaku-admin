import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateArtikel() {
  const navigate = useNavigate();

  const [artikelData, setArtikelData] = useState({
    judul: '',
    isi: '',
  });

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/artikel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(artikelData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('New Artikel data created successfully');

      navigate('/artikel');
    } catch (error) {
      console.error('Error creating new Artikel data:', error);
    }
  };

  const handleBack = () => {
    navigate('/artikel', { replace: true });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Create Artikel</h5>

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

          <div className="text-center">
            <button type="button" className="btn btn-primary" onClick={handleCreate}>
              Create
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

export default CreateArtikel;
