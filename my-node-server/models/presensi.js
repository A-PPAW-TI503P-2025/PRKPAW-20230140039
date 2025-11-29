'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Presensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ✅ IMPLEMENTASI RELASI MANY-TO-ONE (Presensi.belongsTo(User))
      Presensi.belongsTo(models.User, {
        foreignKey: 'userId', // Ini adalah kolom kunci asing di tabel Presensi
        as: 'user'           // Alias yang akan digunakan saat melakukan eager loading
      }); 
    }
  }
  Presensi.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // ❌ KOLOM NAMA DIHAPUS sesuai requirements ujian
    /*
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    */
    checkIn: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    checkOut: {
      type: DataTypes.DATE,
      allowNull: true, // Boleh null
    }
  }, {
    sequelize,
    modelName: 'Presensi',
  });
  return Presensi;
};