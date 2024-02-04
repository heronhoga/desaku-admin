import React from "react";
import "./styles/WargaCard.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
function WargaCard({ data }) {
    
  const { id_warga, nama, tanggal_lahir, jenis_kelamin, nik, alamat, saldo } = data;
  const navigate = useNavigate();

  // State to manage form data
  const [formData, setFormData] = useState({
    nama: data.nama,
    tanggal_lahir: data.tanggal_lahir,
    jenis_kelamin: data.jenis_kelamin,
    nik: data.nik,
    alamat: data.alamat,
    saldo: data.saldo
  });

  // Update form data on input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Handle form submission and API request
  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = `http://localhost:8080/admin/warga/${data.id_warga}`;
    try {
      // Perform API request to update data
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Add any other headers you need, like authentication headers
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Data successfully updated, navigate back to /warga
        navigate("/warga");
      } else {
        // Handle error cases
        console.error("Failed to update data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="card-container text-center">
      <div className="container mt-5 ctWarga">
        <form onSubmit={handleSubmit}>
          <h2>Edit Warga</h2>

          <div className="mb-3">
            <label htmlFor="nama" className="form-label">
              Nama
            </label>
            <input
              type="text"
              className="form-control"
              id="nama"
              value={formData.nama}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tanggal_lahir" className="form-label">
              Tanggal Lahir
            </label>
            <input
              type="date"
              className="form-control"
              id="tanggal_lahir"
              value={formData.tanggal_lahir}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="jenis_kelamin" className="form-label">
              Jenis Kelamin
            </label>
            <select
              className="form-select"
              id="jenis_kelamin"
              value={formData.jenis_kelamin}
              onChange={handleChange}
            >
              <option value="laki-laki">laki-laki</option>
              <option value="perempuan">perempuan</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="nik" className="form-label">
              NIK
            </label>
            <input
              type="number"
              className="form-control"
              id="nik"
              value={formData.nik}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="alamat" className="form-label">
              Alamat
            </label>
            <textarea
              className="form-control"
              id="alamat"
              rows="3"
              value={formData.alamat}
              onChange={handleChange}
            ></textarea>
          </div>

          <div className="mb-3">
            <label htmlFor="saldo" className="form-label">
              Saldo
            </label>
            <input
              type="number"
              className="form-control"
              id="saldo"
              value={formData.saldo}
              onChange={handleChange}
            />
          </div>
          <br></br>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
          <Link to="/warga">
            <button type="button" className="btn btn-back">
              Back
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
}

export default WargaCard;
