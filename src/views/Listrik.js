import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import "../views/styles/Listrik.css";

function Listrik() {
  const [showAddBillButton, setShowAddBillButton] = useState(false);
  const headers = [
    "Total Tagihan Listrik",
    "Tanggal Tagihan",
    "Status",
    "Nama",
    "Alamat",
  ];
  const [searchText, setSearchText] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const navigate = useNavigate();

  function getCurrentMonth() {
    const month = new Date().getMonth() + 1;
    return month < 10 ? `0${month}` : `${month}`;
  }

  function getCurrentYear() {
    const year = new Date().getFullYear();
    return year.toString();
  }

  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    setFilteredRows(
      rows.filter(
        (row) =>
          row[0].toLowerCase().includes(lowercasedSearchText) ||
          row[3].toLowerCase().includes(lowercasedSearchText)
      )
    );
  }, [searchText, rows]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/listrik/tagihan/${selectedMonth}`,
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
          }).format(item.total_tagihan_listrik),
          item.tanggal_tagihan,
          item.status,
          item.nama,
          item.alamat,
        ]);

        setRows(formattedData);
        setFilteredRows(formattedData);
        setShowAddBillButton(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedMonth]);

  const handleAddBillClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/listrik/tagihan/${selectedMonth}`,
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
        <label htmlFor="monthSelect">Pilih bulan tagihan Listrik : {getCurrentYear()}</label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={(event) => setSelectedMonth(event.target.value)}
        >
          {Array.from({ length: 12 }, (_, index) => {
            const monthNumber = (index + 1).toString().padStart(2, "0");
            return (
              <option key={monthNumber} value={monthNumber}>
                {new Date(2000, index).toLocaleString("en-US", {
                  month: "long",
                })}
              </option>
            );
          })}
        </select>

        <br></br>
        {showAddBillButton && (
          <div className="addBillButtonContainer">
            <button onClick={handleAddBillClick} className="btn btn-success">
              Tambahkan tagihan bulan ini
            </button>
          </div>
        )}
      </div>
      <div className="tableContainer tableListrik">
      <Table headers={headers} rows={filteredRows} />
      </div>
    </div>
  );
}

export default Listrik;
