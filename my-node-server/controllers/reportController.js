// controllers/reportController.js

// Import Model User untuk Eager Loading
const { Presensi, User } = require('../models'); 
const { Op } = require('sequelize');

exports.getDailyReport = async (req, res) => {
  try {
    const { nama, tanggalMulai, tanggalSelesai } = req.query;
    
    // ⚠️ Gunakan object User untuk filter nama
    const userFilter = {}; 
    const options = { 
        where: {},
        // ✅ EAGER LOADING: Ambil data User yang berelasi dengan Presensi
        include: [{ 
            model: User,
            as: 'user', // Sesuai dengan alias 'as' di models/presensi.js
            where: userFilter, 
            attributes: ['id', 'nama', 'email'] // Pilih kolom yang diperlukan
        }], 
    };

    // Filter berdasarkan nama (di tabel User)
    if (nama) {
        // ✅ Logika filter nama dipindahkan ke dalam object userFilter
        userFilter.nama = { [Op.like]: `%${nama}%` };
    }

    // Filter berdasarkan tanggal checkIn (tetap di tabel Presensi)
    if (tanggalMulai && tanggalSelesai) {
      options.where.checkIn = {
        [Op.between]: [new Date(tanggalMulai), new Date(tanggalSelesai)],
      };
    } else if (tanggalMulai) {
      options.where.checkIn = { [Op.gte]: new Date(tanggalMulai) };
    } else if (tanggalSelesai) {
      options.where.checkIn = { [Op.lte]: new Date(tanggalSelesai) };
    }

    // Tambahkan urutan data (misal urut dari terbaru)
    options.order = [['checkIn', 'DESC']];

    // Mengambil data dengan Eager Loading
    const records = await Presensi.findAll(options);

    res.json({
      reportDate: new Date().toLocaleDateString('id-ID'),
      filter: { nama, tanggalMulai, tanggalSelesai },
      totalData: records.length,
      data: records,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Gagal mengambil laporan',
      error: error.message,
    });
  }
};