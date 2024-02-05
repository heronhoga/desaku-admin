import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePasar() {
  const navigate = useNavigate();

  const [pasarData, setPasarData] = useState({
    nama_toko: '',
    nama_pedagang: '',
    jenis_dagangan: '',
    status: '',
  });

  const handleCreate = async () => {
    try {
      const response = await fetch('http://localhost:8080/admin/epasar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(pasarData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('New Pasar data created successfully');

      navigate('/epasar');
    } catch (error) {
      console.error('Error creating new Pasar data:', error);
    }
  };

  const handleBack = () => {
    navigate('/epasar', { replace: true });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Create Pasar</h5>

        <form>
          <div className="mb-3">
            <label htmlFor="namaToko" className="form-label">Nama Toko</label>
            <input
              type="text"
              className="form-control"
              id="namaToko"
              value={pasarData.nama_toko}
              onChange={(e) => setPasarData({ ...pasarData, nama_toko: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="namaPedagang" className="form-label">Nama Pedagang</label>
            <input
              type="text"
              className="form-control"
              id="namaPedagang"
              value={pasarData.nama_pedagang}
              onChange={(e) => setPasarData({ ...pasarData, nama_pedagang: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="jenisDagangan" className="form-label">Jenis Dagangan</label>
            <input
              type="text"
              className="form-control"
              id="jenisDagangan"
              value={pasarData.jenis_dagangan}
              onChange={(e) => setPasarData({ ...pasarData, jenis_dagangan: e.target.value })}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="status" className="form-label">Status</label>
            <select
              className="form-select"
              id="status"
              value={pasarData.status}
              onChange={(e) => setPasarData({ ...pasarData, status: e.target.value })}
            >
              <option value="1">Aktif</option>
              <option value="0">Tidak Aktif</option>
            </select>
          </div>

          <div className="buttons">
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

export default CreatePasar;
