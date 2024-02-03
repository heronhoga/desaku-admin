import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import Table from '../components/Table';
import '../views/styles/Warga.css';

function Warga() {
    const headers = ['Nama', 'Tanggal Lahir', 'Jenis Kelamin', 'NIK', 'Alamat', 'Saldo', 'Action'];
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState([]);
    const [filteredRows, setFilteredRows] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8080/admin/warga', {
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            
            const formattedData = jsonData.data.map(item => [
                item.nama,
                item.tanggal_lahir,
                item.jenis_kelamin,
                item.nik,
                item.alamat,
                new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(item.saldo),
                <div className="d-flex justify-content-between">
                    <button type="button" className="btn btn-primary btn-sm btn-xs upBtn">Edit</button>
                    <button type="button" className="btn btn-danger btn-sm btn-xs">Delete</button>
                </div>
            ]);

            setRows(formattedData);
            setFilteredRows(formattedData);
        }

        fetchData();
    }, []);

    useEffect(() => {
        const lowercasedSearchText = searchText.toLowerCase();
        setFilteredRows(rows.filter(row => 
            row[0].toLowerCase().includes(lowercasedSearchText) || 
            row[3].toLowerCase().includes(lowercasedSearchText)
        ));
    }, [searchText, rows]);

    return (
        <div className='wargaNav'>
            <Navbar/>
            <div className="searchBar">
                <input 
                    type="text" 
                    placeholder="Cari warga (Nama/NIK).." 
                    value={searchText} 
                    onChange={(event) => setSearchText(event.target.value)}
                />
            </div>
            <Table headers={headers} rows={filteredRows} />
        </div>
    );
}

export default Warga;

