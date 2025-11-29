// controllers/presensiController.js

// 1. Ganti sumber data dari array ke model Sequelize
const { Presensi } = require("../models");
const { format } = require("date-fns-tz");
const timeZone = "Asia/Jakarta";

exports.CheckIn = async (req, res) => {
  try {
    const { id: userId, nama: userName } = req.user;
    const { latitude, longitude } = req.body; // ✅ Ambil data lokasi dari body [cite: 89]
    const waktuSekarang = new Date();

    // 3. Ubah cara mencari data menggunakan 'findOne' dari Sequelize
    const existingRecord = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
      // Anda bisa menambahkan filter tanggal hari ini di sini untuk presisi
    });

    if (existingRecord) {
      return res
        .status(400)
        .json({ message: "Anda sudah melakukan check-in hari ini." });
    }
    
    // ⚠️ Peringatan jika lokasi tidak ada
    if (!latitude || !longitude) {
        // Ini opsional, tergantung apakah lokasi diwajibkan
        console.warn("Check-In dilakukan tanpa koordinat lokasi.");
    }

    // 4. Ubah cara membuat data baru menggunakan 'create' dari Sequelize
    const newRecord = await Presensi.create({
      userId: userId,
      // ❌ HAPUS: nama: userName, <-- Kolom 'nama' sudah dihapus
      checkIn: waktuSekarang,
      latitude: latitude,    // ✅ Simpan latitude [cite: 94]
      longitude: longitude,  // ✅ Simpan longitude [cite: 95]
    });

    const formattedData = {
        userId: newRecord.userId,
        // nama: newRecord.nama, <-- Hapus
        checkIn: format(newRecord.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
        checkOut: null,
        latitude: newRecord.latitude,
        longitude: newRecord.longitude,
    };

    res.status(201).json({
      message: `Halo ${userName}, check-in Anda berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
      )} WIB`,
      data: formattedData,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

// controllers/presensiController.js (Bagian CheckOut)

exports.CheckOut = async (req, res) => {
  try {
    const { id: userId, nama: userName } = req.user;
    const waktuSekarang = new Date();

    // Cari data di database
    const recordToUpdate = await Presensi.findOne({
      where: { userId: userId, checkOut: null },
    });

    if (!recordToUpdate) {
      return res.status(404).json({
        message: "Tidak ditemukan catatan check-in yang aktif untuk Anda.",
      });
    }

    // 5. Update dan simpan perubahan ke database
    recordToUpdate.checkOut = waktuSekarang;
    await recordToUpdate.save();

    const formattedData = {
        userId: recordToUpdate.userId,
        // ❌ HAPUS: nama: recordToUpdate.nama,
        checkIn: format(recordToUpdate.checkIn, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
        checkOut: format(recordToUpdate.checkOut, "yyyy-MM-dd HH:mm:ssXXX", { timeZone }),
    };

    res.json({
      message: `Selamat jalan ${userName}, check-out Anda berhasil pada pukul ${format(
        waktuSekarang,
        "HH:mm:ss",
        { timeZone }
      )} WIB`,
      data: formattedData,
    });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};

// controllers/presensiController.js (Bagian updatePresensi)

exports.updatePresensi = async (req, res) => {
  try {
    const presensiId = req.params.id;
    // ❌ HAPUS 'nama' dari destructuring
    const { checkIn, checkOut } = req.body; 

    // ❌ HAPUS 'nama' dari validasi
    if (checkIn === undefined && checkOut === undefined) {
      return res.status(400).json({
        message: "Request body tidak berisi data yang valid untuk diupdate (checkIn atau checkOut).",
      });
    }

    const recordToUpdate = await Presensi.findByPk(presensiId);
    if (!recordToUpdate) {
      return res
        .status(404)
        .json({ message: "Catatan presensi tidak ditemukan." });
    }

    recordToUpdate.checkIn = checkIn || recordToUpdate.checkIn;
    recordToUpdate.checkOut = checkOut || recordToUpdate.checkOut;
    // ❌ HAPUS: recordToUpdate.nama = nama || recordToUpdate.nama; 
    
    await recordToUpdate.save();

    res.json({
      message: "Data presensi berhasil diperbarui.",
      data: recordToUpdate,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Terjadi kesalahan pada server", error: error.message });
  }
};