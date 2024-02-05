import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import Table from '../components/Table';
import '../views/styles/Pasar.css';
import { useNavigate } from 'react-router-dom';

function Pasar() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/epasar', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        const formattedData = jsonData.data.map((item) => ({
          id_toko: item.id_toko,
          nama_toko: item.nama_toko,
          nama_pedagang: item.nama_pedagang,
          jenis_dagangan: item.jenis_dagangan,
          status: item.status,
        }));

        setRows(formattedData);
        setFilteredRows(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (searchTerm) => {
    const filteredData = rows.filter((row) => {
      return row.nama_toko.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredRows(filteredData);
  };

  const handleEdit = (id_toko) => {
    console.log(`Editing toko with id_toko ${id_toko}`);
  };

  const handleDelete = async (id_toko) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/epasar/${id_toko}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log(`Toko with id_toko ${id_toko} deleted successfully`);

      window.location.reload(true);
    } catch (error) {
      console.error(`Error deleting toko with id_toko ${id_toko}:`, error);
    }
  };

  return (
    <div className="wargaNav">
      <Navbar />

      <div className="searchBar">
        <input
          type="text"
          placeholder="Cari nama toko..."
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>

      <div className="tableContainer pasar">
        <Table
          headers={['Nama Toko', 'Nama Pedagang', 'Jenis Dagangan', 'Status', 'Action']}
          rows={filteredRows.map((row) => [
            row.nama_toko,
            row.nama_pedagang,
            row.jenis_dagangan,
            row.status === '1' ? 'Aktif' : 'Non-Aktif',
            <div key={row.id_toko}>
              <button
                type="button"
                className="btn btn-primary pasarEditBtn"
                onClick={() => handleEdit(row.id_toko)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(row.id_toko)}
              >
                Delete
              </button>
            </div>,
          ])}
        />
      </div>
    </div>
  );
}

export default Pasar;
