import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Fungsi helper untuk mengambil token dari localStorage
const getToken = () => localStorage.getItem("token");

function AttendancePage() {
    // State untuk pesan sukses/error
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const API_URL = "http://localhost:3001/api/attendance"; 

    // Konfigurasi Header untuk menyertakan JWT
    const getAuthConfig = () => {
        const token = getToken();
        if (!token) {
            navigate("/login"); // Redirect jika token tidak ada
            return null;
        }
        return {
            headers: {
                Authorization: `Bearer ${token}`, // Menyertakan token JWT
            },
        };
    };

    const handleCheckIn = async () => {
        setError("");
        setMessage("");
        const config = getAuthConfig();
        if (!config) return;

        try {
            // POST /api/attendance/check-in
            const response = await axios.post(
                `${API_URL}/check-in`,
                {}, 
                config
            );
            setMessage(`Check-In Berhasil: ${response.data.message}`);
        } catch (err) {
            setError(err.response ? err.response.data.message : "Check-in gagal");
        }
    };

    const handleCheckOut = async () => {
        setError("");
        setMessage("");
        const config = getAuthConfig();
        if (!config) return;

        try {
            // POST /api/attendance/check-out
            const response = await axios.post(
                `${API_URL}/check-out`,
                {}, // Body kosong, karena userId diambil dari JWT payload
                config
            );
            setMessage(`Check-Out Berhasil: ${response.data.message}`);
        } catch (err) {
            setError(err.response ? err.response.data.message : "Check-out gagal");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Lakukan Presensi
                </h2>
                {/* Menampilkan pesan sukses atau error */}
                {message && <p className="text-green-600 mb-4">{message}</p>}
                {error && <p className="text-red-600 mb-4">{error}</p>}
                <div className="flex space-x-4">
                    <button
                        onClick={handleCheckIn}
                        className="w-full py-3 px-4 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700"
                    >
                        Check-In
                    </button>
                    <button
                        onClick={handleCheckOut}
                        className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700"
                    >
                        Check-Out
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AttendancePage;