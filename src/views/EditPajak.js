import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../views/styles/EditPajak.css';

function EditPajak() {
  const { id_pajak } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState({
    total_tagihan_pajak: 0,
    status_bayar: '',
    nama: '',
    alamat: '',
  });

  useEffect(() => {
    // Fetch data before rendering
    fetchData();
  }, [id_pajak]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/pajak/${id_pajak}`, {
        credentials: 'include',
      });
      const result = await response.json();

      if (response.ok) {
        const finalResult = result.data;

        setData({
          total_tagihan_pajak: finalResult.total_tagihan_pajak || 0,
          status_bayar: finalResult.status_bayar,
          nama: finalResult.nama,
          alamat: finalResult.alamat,
        });
      } else {
        console.error('Failed to fetch data:', result.message);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleInputChange = (e) => {
    setData({
      ...data,
      total_tagihan_pajak: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:8080/admin/pajak/${id_pajak}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          total_tagihan_pajak: data.total_tagihan_pajak,
        }),
      });

      if (response.ok) {
        console.log('Total Tagihan Pajak updated successfully');
        navigate('/pajak', { replace: true });
      } else {
        console.error('Failed to update Total Tagihan Pajak');
      }
    } catch (error) {
      console.error('Error updating Total Tagihan Pajak:', error);
    }
  };

  const handleBack = () => {
    navigate('/pajak');
  };

  return (
    <div className="container mt-4">
      <div className="custom-card">
        <div className="custom-card-body">
          <h5 className="card-title">Ubah Tagihan Pajak</h5>
          <div>
            <label>Total Tagihan Pajak:</label>
            <input
              type="text"
              value={data.total_tagihan_pajak}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div>
            <label>Status Bayar:</label>
            <p className='borderBox'>{data.status_bayar}</p>
          </div>
          <div>
            <label>Nama:</label>
            <p className='borderBox'>{data.nama}</p>
          </div>
          <div>
            <label>Alamat:</label>
            <p className='borderBox'>{data.alamat}</p>
          </div>
          <button onClick={handleUpdate} className="btn btn-primary updateBtn">
            Update Total Tagihan Pajak
          </button>
          <button onClick={handleBack} className="btn btn-back">
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditPajak;
