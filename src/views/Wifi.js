// Wifi.js
import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import "../views/styles/Wifi.css";

function Wifi() {
  const [showActivateButton, setShowActivateButton] = useState(false);
  const headers = ["Nama", "Alamat", "Action"];
  const [searchText, setSearchText] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("aktivasi");
  const [rows, setRows] = useState([]);
  const [filteredRows, setFilteredRows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const lowercasedSearchText = searchText.toLowerCase();
    setFilteredRows(
      rows.filter(
        (row) =>
          row[0].toLowerCase().includes(lowercasedSearchText) ||
          row[2].toLowerCase().includes(lowercasedSearchText)
      )
    );
  }, [searchText, rows]);

  useEffect(() => {
    fetchData();
  }, [selectedStatus]);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/admin/wifi/${selectedStatus}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        if (response.status === 404) {
          setRows([]);
          setFilteredRows([]);
          setShowActivateButton(false);
          return;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();

      const formattedData = jsonData.data.map((item) => [
        item.nama,
        item.alamat,
        <button
          className={`btn ${
            item.status === "proses" ? "btn-primary" : "btn-danger"
          }`}
          onClick={() => handleActionClick(item.id_pelanggan, item.status)}
        >
          {item.status === "proses" ? "Activate" : "Delete"}
        </button>,
      ]);

      setRows(formattedData);
      setFilteredRows(formattedData);
      setShowActivateButton(formattedData.length > 0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleActionClick = async (idPelanggan, status) => {
    try {
      let apiUrl = "";
      let method = "";

      if (selectedStatus === "aktivasi") {
        apiUrl = `http://localhost:8080/admin/wifi/aktivasi/${idPelanggan}`;
        method = "PUT";
      } else if (selectedStatus === "putus") {
        apiUrl = `http://localhost:8080/admin/wifi/putus/${idPelanggan}`;
        method = "DELETE";
      }

      const response = await fetch(apiUrl, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const jsonData = await response.json();

      console.log("Action performed successfully:", jsonData);

      fetchData();
    } catch (error) {
      console.error("Error performing action:", error);
    }
  };

  return (
    <div className="wargaNav">
      <Navbar />

      <div className="searchBar">
        <input
          type="text"
          placeholder="Cari warga (Nama/Alamat).."
          className="searchInput"
          value={searchText}
          onChange={(event) => setSearchText(event.target.value)}
        />
        <label htmlFor="statusInput">Pilih status Wifi :</label>
        <select
          id="statusInput"
          value={selectedStatus}
          onChange={(event) => setSelectedStatus(event.target.value)}
        >
          <option value="aktivasi">Permintaan Aktivasi</option>
          <option value="putus">Proses Putus</option>
        </select>

        <br />

      </div>
      <div className="tableContainer tableWifi">
        <Table headers={headers} rows={filteredRows} />
      </div>
    </div>
  );
}

export default Wifi;
