import React, { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import Table from "../components/Table";
import "../views/styles/TagihanWifi.css";
import { useNavigate } from "react-router-dom";

function TagihanWifi() {
  const [showAddBillButton, setShowAddBillButton] = useState(false);
  const headers = [
    "Total Tagihan WiFi",
    "Tanggal Tagihan",
    "Status",
    "Nama",
    "Alamat",
  ];
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
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/admin/wifi/tagihan`,
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
          }).format(item.total_tagihan_wifi),
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
  }, []);

  const handleAddBillClick = async () => {
  try {
    const response = await fetch(
      `http://localhost:8080/admin/wifi/tagihan/${selectedMonth}`,
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

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  useEffect(() => {
    const filteredData = rows.filter((row) => {
      const rowMonth = row[1].split("-")[1];
      return rowMonth === selectedMonth;
    });

    setFilteredRows(filteredData);
    setShowAddBillButton(filteredData.length === 0);
  }, [selectedMonth, rows]);

  return (
    <div className="wargaNav">
      <Navbar />

      <div className="searchBar">
        <label htmlFor="monthSelect">Pilih bulan tagihan WiFi {getCurrentYear()} : </label>
        <select
          id="monthSelect"
          value={selectedMonth}
          onChange={handleMonthChange}
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

        <br />
        {showAddBillButton && (
          <div className="addBillButtonContainer">
            <button onClick={handleAddBillClick} className="btn btn-success">
              Tambahkan tagihan bulan ini
            </button>
          </div>
        )}
      </div>
      <div className="tableContainer tabwifi">
        <Table headers={headers} rows={filteredRows} />
      </div>
    </div>
  );
}

export default TagihanWifi;
