import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import "../views/styles/Listrik.css";

function Pajak() {
  const [showAddBillButton, setShowAddBillButton] = useState(false);
  const headers = [
    "Total Tagihan Pajak",
    "Status",
    "Nama",
    "Alamat",
    "Action",
  ];
  const [searchText, setSearchText] = useState("");
  const [selectedYear, setSelectedYear] = useState(getCurrentYear());
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const navigate = useNavigate();

  function getCurrentYear() {
    const year = new Date().getFullYear();
    return year.toString();
  }

  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    setFilteredRows(
      rows.filter(
        (row) =>
          row[2].toLowerCase().includes(lowercasedSearchText)
      )
    );
  }, [searchText, rows]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/pajak/tagihan/${selectedYear}`,
          {
            credentials: "include",
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            setRows([]);
            setFilteredRows([]);
            setShowAddBillButton(true);
            return;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const jsonData = await response.json();

        const formattedData = jsonData.data.map((item) => [
          new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(item.total_tagihan_pajak),
          item.status_bayar,
          item.nama,
          item.alamat,
          <button className="btn btn-primary" onClick={() => navigate(`/edit-pajak/${item.id_pajak}`)}>Edit Tagihan</button>,
        ]);

        setRows(formattedData);
        setFilteredRows(formattedData);
        setShowAddBillButton(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedYear]);

  const handleAddBillClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/pajak/tagihan/${selectedYear}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",

          },
          credentials: "include",

        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();

      console.log("Bill created successfully:", jsonData);

      window.location.reload(true);
    } catch (error) {
      console.error("Error creating bill:", error);
    }
  };

  return (
    <div className="wargaNav">
      <Navbar />

      <div className="searchBar">
        <input
          type="text"
          placeholder="Cari warga (Nama).."
          className="searchInput"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <label htmlFor="yearInput">Pilih tahun tagihan Pajak :</label>
        <input
        type="number"
        id="yearInput"
        value={selectedYear}
        onChange={(event) => setSelectedYear(event.target.value)}
        />

        <br></br>
        {showAddBillButton && (
          <div className="addBillButtonContainer">
            <button onClick={handleAddBillClick} className="btn btn-success">
              Tambahkan tagihan bulan ini
            </button>
          </div>
        )}
      </div>
      <div className="tableContainer tablePajak">
      <Table headers={headers} rows={filteredRows} />
      </div>
    </div>
  );
}

export default Pajak;
