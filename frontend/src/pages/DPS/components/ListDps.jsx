import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa"; // Importing trash icon

function ListDps() {
  const [dpsList, setDpsList] = useState([]);
  const [filters, setFilters] = useState({
    jenis: "",
    tahun: "",
    kelompok: "",
    kategori: "",
  });

  // Fetching DPS data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/dps");
        setDpsList(response.data);
      } catch (error) {
        console.error("Error fetching DPS data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Format the date to a more readable format
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get the current year and create a range for the last 5 years dynamically
  const getYearRange = () => {
    const currentYear = new Date().getFullYear();
    let years = [];
    for (let i = 0; i < 5; i++) {
      years.push(currentYear - i);
    }
    return years;
  };

  // Filter the data based on selected filters
  const filteredDps = dpsList.filter((dps) => {
    return (
      (!filters.jenis || dps.jenis === filters.jenis) &&
      (!filters.tahun ||
        new Date(dps.tanggalMasehi).getFullYear() ===
          parseInt(filters.tahun)) &&
      (!filters.kelompok || dps.kelompok === filters.kelompok) &&
      (!filters.kategori || dps.kategori === filters.kategori)
    );
  });

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this DPS?"
    );
    if (confirmed) {
      try {
        const response = await axios.delete(
          `http://localhost:3000/api/dps/${id}`
        );
        if (response.status === 200) {
          setDpsList((prevData) => prevData.filter((dps) => dps._id !== id));
          alert("DPS deleted successfully!");
        } else {
          alert("Failed to delete DPS.");
        }
      } catch (error) {
        console.error("Error deleting DPS:", error);
        alert("Failed to delete DPS.");
      }
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Filter Section */}
      <div className="flex space-x-4 mb-6">
        <select
          name="jenis"
          value={filters.jenis}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg">
          <option value="">Jenis</option>
          <option value="Opini DPS">Opini DPS</option>
          <option value="Risalah Rapat">Risalah Rapat</option>
        </select>

        <select
          name="tahun"
          value={filters.tahun}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg">
          <option value="">Semua Tahun</option>
          {getYearRange().map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>

        <select
          name="kelompok"
          value={filters.kelompok}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg">
          <option value="">Kelompok</option>
          {[
            "Produk",
            "Financing Model",
            "Program",
            "Policy & Procedure",
            "Fitur Produk",
            "Dana Kebajikan & Zakat",
          ].map((kelompok) => (
            <option key={kelompok} value={kelompok}>
              {kelompok}
            </option>
          ))}
        </select>

        <select
          name="kategori"
          value={filters.kategori}
          onChange={handleFilterChange}
          className="p-2 border border-gray-300 rounded-lg">
          <option value="">Kategori</option>
          {[
            "Financing",
            "Asuransi",
            "Kepatuhan Syariah",
            "Dana Kebajikan & Zakat",
            "Funding",
            "Syariah Card",
            "Investment",
            "Trade Finance",
            "Layanan Jasa",
            "Zakat",
            "Treasury",
            "DBLM",
          ].map((kategori) => (
            <option key={kategori} value={kategori}>
              {kategori}
            </option>
          ))}
        </select>
      </div>

      {/* Table Section */}
      <table className="min-w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="py-2 px-4 border-b">No</th>
            <th className="py-2 px-4 border-b">Jenis</th>
            <th className="py-2 px-4 border-b">Nomor</th>
            <th className="py-2 px-4 border-b">Tanggal Masehi</th>
            <th className="py-2 px-4 border-b">Judul</th>
            <th className="py-2 px-4 border-b">Kelompok</th>
            <th className="py-2 px-4 border-b">Kategori</th>
            <th className="py-2 px-4 border-b">Sub Kategori</th>
            <th className="py-2 px-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredDps.map((dps, index) => (
            <tr key={dps._id} className="border-b">
              <td className="py-2 px-4">{index + 1}</td>
              <td className="py-2 px-4">{dps.jenis}</td>
              <td className="py-2 px-4">{dps.nomor}</td>
              <td className="py-2 px-4">{formatDate(dps.tanggalMasehi)}</td>
              <td className="py-2 px-4">{dps.judul}</td>
              <td className="py-2 px-4">{dps.kelompok}</td>
              <td className="py-2 px-4">{dps.kategori}</td>
              <td className="py-2 px-4">{dps.subKategori}</td>
              <td className="py-2 px-4 text-center">
                <button
                  onClick={() => handleDelete(dps._id)}
                  className="text-red-500 hover:text-red-700">
                  <FaTrashAlt />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ListDps;
