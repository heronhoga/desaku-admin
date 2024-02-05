import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import "./styles/EditPasar.css";

function EditPasar() {
    const navigate = useNavigate();
  const [pasarData, setPasarData] = useState({
    nama_toko: '',
    nama_pedagang: '',
    jenis_dagangan: '',
    status: '',
  });

  const { id_toko } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8080/admin/epasar/${id_toko}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        if (jsonData.data) {
          setPasarData(jsonData.data);
        } else {
          console.error('Invalid API response format:', jsonData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [id_toko]);

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/epasar/${id_toko}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          nama_toko: pasarData.nama_toko,
          nama_pedagang: pasarData.nama_pedagang,
          jenis_dagangan: pasarData.jenis_dagangan,
          status: pasarData.status,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
  
      navigate('/epasar', { replace: true });
    } catch (error) {
      console.error('Error updating Pasar data:', error);
    }
  };
  

  const handleBack = () => {
    navigate('/epasar', { replace: true });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Edit Pasar Data</h5>

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

export default EditPasar;
