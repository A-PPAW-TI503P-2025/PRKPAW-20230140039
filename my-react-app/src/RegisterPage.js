import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // <--- TAMBAHKAN INI

const RegisterPage = () => {
    const [nama, setNama] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('mahasiswa');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('Sedang mendaftarkan...');
        try {
            const response = await fetch('http://localhost:3001/api/auth/register', { 
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nama, email, password, role })
            });
            const data = await response.json();
            if (response.ok) {
                // Setelah registrasi berhasil, Anda bisa mengarahkan user ke halaman login
                setMessage('Registrasi Berhasil! Silakan Login.');
            } else {
                setMessage(`Registrasi Gagal: ${data.message}`);
            }
        } catch (error) {
            setMessage('Terjadi kesalahan koneksi.');
        }
    };

    // --- STYLING BARU --- (Sama seperti sebelumnya)
    const primaryColor = '#800020'; 
    const bgColor = '#F5F5DC'; 
    
    const containerStyle = {
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${bgColor} 0%, #E6E6FA 100%)`,
    };

    const formBoxStyle = {
        padding: '50px 40px',
        borderRadius: '15px', 
        boxShadow: '0 15px 40px rgba(0, 0, 0, 0.1)',
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '420px',
        textAlign: 'center',
    };

    const inputGroupStyle = {
        textAlign: 'left',
        marginBottom: '20px',
    };

    const inputStyle = {
        width: '100%',
        padding: '12px',
        marginTop: '8px',
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        boxSizing: 'border-box',
        fontSize: '16px',
        appearance: 'none',
    };

    const buttonStyle = {
        background: primaryColor,
        color: 'white',
        padding: '15px 20px',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        width: '100%',
        fontSize: '18px',
        fontWeight: '700',
        marginTop: '25px',
        boxShadow: '0 4px 10px rgba(128, 0, 32, 0.4)',
    };
    
    const iconStyle = { color: primaryColor, fontSize: '40px', marginBottom: '15px' };


    return (
        <div style={containerStyle}>
            <div style={formBoxStyle}>
                <div style={iconStyle}>👥</div> 
                <h2 style={{ fontSize: '26px', fontWeight: 'bold', color: primaryColor }}>Buat Akun Baru</h2>
                <p style={{ color: '#555', marginBottom: '35px' }}>Daftar untuk mengakses sistem informasi akademik</p>
                
                <form onSubmit={handleSubmit}>
                    <div style={inputGroupStyle}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px', color: '#333' }}>Nama Lengkap</label>
                        <input type="text" value={nama} onChange={(e) => setNama(e.target.value)} style={inputStyle} placeholder="Nama sesuai KTP/NIM" required />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px', color: '#333' }}>Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} placeholder="email@universitas.ac.id" required />
                    </div>
                    <div style={inputGroupStyle}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px', color: '#333' }}>Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} placeholder="Buat password yang kuat" required />
                    </div>
                    {/* Role */}
                    <div style={inputGroupStyle}>
                        <label style={{ display: 'block', fontWeight: '600', marginBottom: '5px', color: '#333' }}>Role</label>
                        <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle}>
                            <option value="mahasiswa">Mahasiswa</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    <button type="submit" style={buttonStyle}>Daftar Sekarang</button>
                </form>

                <p style={{ marginTop: '30px', color: '#555' }}>
                    Sudah punya akun? 
                    {/* ⬅️ PERBAIKAN: Mengganti <a> dengan <Link> */}
                    <Link to="/login" style={{ color: primaryColor, textDecoration: 'none', fontWeight: 'bold' }}> Login disini</Link>
                </p>
                <p style={{ color: message.includes('Gagal') ? '#D22B2B' : primaryColor, marginTop: '15px', fontWeight: '600' }}>{message}</p>
            </div>
        </div>
    );
};

export default RegisterPage;