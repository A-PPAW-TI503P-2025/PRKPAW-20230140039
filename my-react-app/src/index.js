import React from 'react';
// Sesuaikan dengan versi React Anda. Jika React 18:
import ReactDOM from 'react-dom/client'; 
// Jika React 17 atau di bawahnya: import ReactDOM from 'react-dom';

import App from './App';

// PENTING: Pastikan ada elemen <div id="root"> di public/index.html
const rootElement = document.getElementById('root');

if (rootElement) {
    // Jika React 18:
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
    // Jika React 17:
    /*
    ReactDOM.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
        rootElement
    );
    */
} else {
    console.error("Elemen dengan id='root' tidak ditemukan di index.html");
}