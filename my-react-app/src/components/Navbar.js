import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    // ... (useEffect dan handleLogout tetap sama) ...
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decoded = jwtDecode(token); 
                setUser(decoded);
            } catch (error) {
                console.error("Token decoding failed:", error);
                handleLogout(); 
            }
        } else {
            setUser(null);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/login');
    };

    // --- Styling Dihilangkan untuk Singkatnya, tapi Anda harus menyertakannya ---
    const linkStyle = { color: 'white', textDecoration: 'none', margin: '0 15px', fontWeight: 'bold' };
    const navStyle = { backgroundColor: '#800020', padding: '15px 50px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'white', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' };
    const userInfoStyle = { display: 'flex', alignItems: 'center' };
    const logoutButtonStyle = { background: 'none', border: 'none', color: '#ffc107', cursor: 'pointer', fontWeight: 'bold', marginLeft: '20px' };

    return (
        <nav style={navStyle}>
            
            {/* ⬅️ START: MENU NAVIGASI KIRI DITAMBAHKAN DI SINI */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                
                {/* 1. Dashboard */}
                <Link to="/dashboard" style={{...linkStyle, fontSize: '1.2em'}}>
                    ACADEMIC PRESENCE
                </Link>
                
                {/* Tampilkan menu hanya jika user sudah login */}
                {user && (
                    <>
                        {/* 2. Presensi (Wajib untuk semua pengguna) [cite: 281] */}
                        <Link to="/presensi" style={linkStyle}>
                            Presensi
                        </Link> 

                        {/* 3. Laporan Admin (Hanya tampil jika user.role === 'admin')  */}
                        {user.role === 'admin' && (
                            <Link to="/reports" style={linkStyle}>
                                Laporan Admin
                            </Link>
                        )}
                    </>
                )}
            </div>
            {/* ➡️ END: MENU NAVIGASI KIRI */}

            <div style={userInfoStyle}>
                {user ? (
                    <>
                        <span>Halo, {user.nama} ({user.role})</span>
                        <button onClick={handleLogout} style={logoutButtonStyle}>
                            Logout [cite: 280]
                        </button>
                    </>
                ) : (
                    <Link to="/login" style={linkStyle}>Login / Register</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;