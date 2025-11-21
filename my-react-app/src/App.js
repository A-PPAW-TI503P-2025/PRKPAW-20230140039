import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import DashboardPage from './DashboardPage';

const App = () => {
    const navStyle = {
        backgroundColor: '#343a40', // Dark background
        padding: '15px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        display: 'flex',
    };

    const linkStyle = {
        color: 'white',
        textDecoration: 'none',
        margin: '0 15px',
        fontWeight: 'bold',
        transition: 'color 0.3s',
    };

    return (
        <Router>
            <nav style={navStyle}>
                <Link to="/" style={{...linkStyle, color: '#ffc107'}}>HOME</Link>
                <Link to="/login" style={linkStyle}>Login</Link>
                <Link to="/register" style={linkStyle}>Register</Link>
                <Link to="/dashboard" style={linkStyle}>Dashboard</Link>
            </nav>
            
            <div>
                <Routes>
                    <Route path="/" element={<LoginPage />} /> 
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;