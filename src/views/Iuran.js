import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import Table from '../components/Table';
import '../views/styles/Iuran.css';
import { useNavigate } from 'react-router-dom';

function Iuran() {
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const navigate = useNavigate();

  function getCurrentMonth() {
    const month = new Date().getMonth() + 1;
    return month < 10 ? `0${month}` : `${month}`;
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/iuran/tagihan/${selectedMonth}`,
          {
            credentials: 'include',
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setRows([]);
            setFilteredRows([]);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        const formattedData = jsonData.data.map((item) => [
          item.jumlah_iuran,
          item.tanggal_iuran,
          item.status,
          item.nama,
          item.alamat,
        ]);

        setRows(formattedData);
        setFilteredRows(formattedData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  const handleSearch = (searchTerm) => {
    const filteredData = rows.filter((row) => {
      return row.some((item) =>
        item.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });

    setFilteredRows(filteredData);
  };

  const handleAddIuranClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/iuran/tagihan/${selectedMonth}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('Tagihan iuran added successfully');
      window.location.reload(true);
    } catch (error) {
      console.error('Error adding tagihan iuran:', error);
    }
  };

  return (
    <div className="wargaNav">
      <Navbar />

      <div className="searchBar">
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => handleSearch(e.target.value)}
        />

        <label htmlFor="monthSelect">Pilih bulan tagihan Iuran:</label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {Array.from({ length: 12 }, (_, index) => {
            const monthNumber = (index + 1).toString().padStart(2, '0');
            return (
              <option key={monthNumber} value={monthNumber}>
                {new Date(2000, index).toLocaleString('en-US', {
                  month: 'long',
                })}
              </option>
            );
          })}
        </select>
      </div>

      {rows.length === 0 && (
        <div className="addIuranButtonContainer">
          <button onClick={handleAddIuranClick} className="btn btn-success">
            Tambahkan tagihan iuran
          </button>
          <br></br>
        </div>
      )}

      <div className="tableContainer iuran">
        <Table
          headers={['Jumlah Iuran', 'Tanggal Iuran', 'Status', 'Nama', 'Alamat']}
          rows={filteredRows}
        />
      </div>
    </div>
  );
}

export default Iuran;
