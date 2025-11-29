import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; 
// Hapus 'Link' dari import karena sudah ada di Navbar.js

// Import Halaman Utama
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';

// Import Component Baru
import Navbar from './components/Navbar';           // <-- WAJIB IMPORT
import AttendancePage from './components/PresensiPage'; // <-- WAJIB IMPORT
import ReportPage from './components/ReportPage';     // <-- WAJIB IMPORT

const App = () => {
    // Hapus variabel navStyle dan linkStyle yang lama

    return (
        <Router>
            
            {/* ⬅️ INI ADALAH TEMPAT BARU UNTUK NAVIGASI */}
            {/* Navbar diletakkan di SINI: Di dalam Router, di luar Routes.    */}
            <Navbar /> 
            
            <div className="content-area">
                <Routes>
                    {/* Route Default: Biasanya diarahkan ke Dashboard/Login */}
                    <Route path="/" element={<DashboardPage />} />
                    
                    {/* Routes Autentikasi */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    
                    {/* Routes Aplikasi Utama */}
                    <Route path="/dashboard" element={<DashboardPage />} />
                    
                    {/* Route untuk Presensi (Check-In & Check-Out) */}
                    <Route path="/presensi" element={<AttendancePage />} /> 

                    {/* Route untuk Laporan (Khusus Admin) */}
                    <Route path="/reports" element={<ReportPage />} /> 
                </Routes>
            </div>
        </Router>
    );
};

export default App;