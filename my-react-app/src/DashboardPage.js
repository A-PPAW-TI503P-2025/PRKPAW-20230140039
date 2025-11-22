import React from 'react';

const DashboardPage = () => {
    const token = localStorage.getItem('token');
    const userName = 'Fahrezi Ahmad Syahyana'; // Ganti dengan data dinamis jika ada

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; 
    };

    // --- STYLING BARU ---
    const primaryColor = '#800020'; // Burgundy
    const secondaryColor = '#C8AE7D'; // Gold/Tan
    const bgColor = '#F5F5DC'; // Cream
    const successColor = '#38761d'; // Hijau tua untuk success
    const warningColor = '#f1c232'; // Kuning untuk warning

    const containerStyle = {
        backgroundColor: bgColor,
        minHeight: '100vh',
        padding: '30px 50px',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: '20px',
        borderBottom: `1px solid ${secondaryColor}`,
        marginBottom: '30px',
    };

    const welcomeCardStyle = {
        background: `linear-gradient(90deg, ${primaryColor} 0%, #B8860B 100%)`, // Gradien Burgundy-Dark Gold
        borderRadius: '15px',
        padding: '40px',
        color: 'white',
        boxShadow: '0 8px 15px rgba(0, 0, 0, 0.15)',
        marginBottom: '30px',
    };

    const metricCardStyle = {
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '25px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)',
    };
    
    const metricsGridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '25px',
        marginBottom: '40px',
    };

    if (!token) {
        return (
            <div style={{...containerStyle, textAlign: 'center', paddingTop: '100px'}}>
                <h2 style={{color: primaryColor}}>Akses Ditolak</h2>
                <p>Anda belum login. Silakan <a href="/login" style={{ color: primaryColor, fontWeight: 'bold' }}>Login disini</a>.</p>
            </div>
        );
    }

    return (
        <div style={containerStyle}>
            <div style={headerStyle}>
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: primaryColor }}>
                    <span role="img" aria-label="dashboard">⚜️</span> Dashboard Akademik
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '14px', color: '#555' }}>
                    <span style={{ marginRight: '15px' }}>{new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', hour12: false })} WIB</span>
                    <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: primaryColor, cursor: 'pointer', fontWeight: 'bold' }}>
                        → Logout
                    </button>
                </div>
            </div>

            <div style={welcomeCardStyle}>
                <p style={{ fontSize: '18px', opacity: 0.8 }}>Selamat Datang Kembali,</p>
                <h2 style={{ fontSize: '36px', fontWeight: '900', marginTop: '5px' }}>{userName}</h2>
                <p style={{ fontSize: '14px', opacity: 0.9 }}>Akses cepat ringkasan informasi akademik Anda di sini.</p>
            </div>

            <div style={metricsGridStyle}>
                {/* Kartu 1: SKS */}
                <div style={{...metricCardStyle, borderLeft: `5px solid ${secondaryColor}`}}>
                    <p style={{ color: '#555', fontSize: '14px', marginBottom: '10px' }}>Mata Kuliah Diambil</p>
                    <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: primaryColor }}>8 SKS</h3>
                    <a href="#" style={{ color: secondaryColor, textDecoration: 'none', fontSize: '14px', marginTop: '10px', display: 'block', fontWeight: 'bold' }}>Aksi Cepat &gt;</a>
                </div>
                
                {/* Kartu 2: Pertemuan */}
                <div style={{...metricCardStyle, borderLeft: `5px solid ${successColor}`}}>
                    <p style={{ color: '#555', fontSize: '14px', marginBottom: '10px' }}>Jadwal Minggu Ini</p>
                    <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: primaryColor }}>12 Pertemuan</h3>
                    <a href="#" style={{ color: successColor, textDecoration: 'none', fontSize: '14px', marginTop: '10px', display: 'block', fontWeight: 'bold' }}>Aksi Cepat &gt;</a>
                </div>

                {/* Kartu 3: IPK */}
                <div style={{...metricCardStyle, borderLeft: `5px solid ${primaryColor}`}}>
                    <p style={{ color: '#555', fontSize: '14px', marginBottom: '10px' }}>IPK Sementara</p>
                    <h3 style={{ fontSize: '32px', fontWeight: 'bold', color: primaryColor }}>3.75</h3>
                    <a href="#" style={{ color: primaryColor, textDecoration: 'none', fontSize: '14px', marginTop: '10px', display: 'block', fontWeight: 'bold' }}>Aksi Cepat &gt;</a>
                </div>
            </div>

            {/* Pemberitahuan Penting */}
            <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '25px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.05)' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px', color: primaryColor }}>Pemberitahuan Penting</h3>
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: primaryColor, marginRight: '10px', fontSize: '18px' }}>•</span>
                        Batas Akhir pengisian KRS adalah tanggal 25 Nov 2025.
                    </li>
                    <li style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
                        <span style={{ color: secondaryColor, marginRight: '10px', fontSize: '18px' }}>•</span>
                        Pengumuman Beasiswa Genap 2025 telah dirilis.
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardPage;