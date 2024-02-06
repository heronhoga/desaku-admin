import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import Table from '../components/Table';
import '../views/styles/Pasar.css';
import { useNavigate } from 'react-router-dom';
import "../views/styles/Artikel.css"

function Artikel() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/artikel', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        const formattedData = jsonData.data.map((item) => ({
          id_artikel: item.id_artikel,
          judul: item.judul,
          isi: item.isi,
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
      return row.judul.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setFilteredRows(filteredData);
  };

  const handleEdit = (id_artikel) => {
    navigate(`/artikel/edit/${id_artikel}`);
  };

  const handleDelete = async (id_artikel) => {
    try {
      const response = await fetch(`http://localhost:8080/admin/artikel/${id_artikel}`, {
        method: 'DELETE',
        credentials: 'include',
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      console.log(`Artikel with id_artikel ${id_artikel} deleted successfully`);
  
      window.location.reload();
    } catch (error) {
      console.error(`Error deleting artikel with id_artikel ${id_artikel}:`, error);
    }
  };
  

  const handleTambahArtikel = () => {
    navigate('/artikel/create');
  };

  return (
    <div className="wargaNav">
      <Navbar />

      <div className="centeredContainer">
        <div className="searchBar">
          <input
            type="text"
            placeholder="Cari judul artikel..."
            onChange={(e) => handleSearch(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-success ml-2 tambahButtonArtikel"
            onClick={handleTambahArtikel}
          >
            Tambah Artikel
          </button>
        </div>
      </div>

      <div className="tableContainer tableArtikel">
        <Table
          headers={['Judul', 'Isi', 'Action']}
          rows={filteredRows.map((row) => [
            row.judul,
            row.isi,
            <div key={row.id_artikel}>
              <button
                type="button"
                className="btn btn-primary pasarEditBtn mr-2"
                onClick={() => handleEdit(row.id_artikel)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleDelete(row.id_artikel)}
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

export default Artikel;
