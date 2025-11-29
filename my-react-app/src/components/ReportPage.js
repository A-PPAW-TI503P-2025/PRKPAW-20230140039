import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Fungsi helper untuk mengambil token dari localStorage
const getToken = () => localStorage.getItem("token");

function ReportPage() {
    const [reports, setReports] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    
    // Pastikan server backend berjalan di http://localhost:3001
    const API_URL = "http://localhost:3001/api/reports/daily"; 

    const fetchReports = async (nameQuery, start, end) => {
        const token = getToken();
        if (!token) {
            navigate("/login");
            return;
        }
        
        // Membangun query URL
        let url = API_URL;
        const queryParams = [];

        if (nameQuery) queryParams.push(`nama=${nameQuery}`);
        if (start) queryParams.push(`startDate=${start}`);
        if (end) queryParams.push(`endDate=${end}`);

        if (queryParams.length > 0) {
            url += `?${queryParams.join('&')}`;
        }
        
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            
            setError(null);
            
            // GET /api/reports/daily (dengan token)
            const response = await axios.get(url, config);
            setReports(response.data.data); 
        } catch (err) {
            if (err.response && err.response.status === 403) {
                 // Menangani error jika pengguna bukan admin
                 setError("Akses ditolak. Anda bukan admin atau token tidak valid."); 
            } else {
                 setError(err.response ? err.response.data.message : "Gagal memuat laporan.");
            }
            setReports([]); // Kosongkan laporan jika ada error
        }
    };

    useEffect(() => {
        // Memuat data awal saat komponen dimuat
        fetchReports("", "", ""); 
    }, [navigate]); 

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchReports(searchTerm, startDate, endDate);
    };
    
    // Fungsi ini dipanggil saat nilai filter tanggal berubah
    const handleFilterChange = () => {
        fetchReports(searchTerm, startDate, endDate);
    };

    return (
        <div className="max-w-6xl mx-auto p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">
                Laporan Presensi Harian
            </h1>

            {/* Form Pencarian dan Filter */}
            <form onSubmit={handleSearchSubmit} className="mb-6 flex flex-wrap gap-4">
                {/* Input Pencarian Nama */}
                <input
                    type="text"
                    placeholder="Cari berdasarkan nama..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                
                {/* Filter Tanggal Mulai */}
                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    onBlur={handleFilterChange} // Panggil saat input kehilangan fokus
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />
                
                {/* Filter Tanggal Akhir */}
                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    onBlur={handleFilterChange} // Panggil saat input kehilangan fokus
                    className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                />

                <button
                    type="submit"
                    className="py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow-sm hover:bg-blue-700"
                >
                    Cari
                </button>
            </form>

            {error && (
                <p className="text-red-600 bg-red-100 p-4 rounded-md mb-4">{error}</p>
            )}

            {!error && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-In</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-Out</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {reports.length > 0 ? (
                                reports.map((presensi) => (
                                    <tr key={presensi.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {/* Menggunakan 'User' karena relasi Sequelize mengembalikan nama Model */}
                                            {presensi.User ? presensi.User.nama : "N/A"} 
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(presensi.checkIn).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {presensi.checkOut
                                                ? new Date(presensi.checkOut).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
                                                : "Belum Check-Out"}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                                        Tidak ada data yang ditemukan.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}

export default ReportPage;