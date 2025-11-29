'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // ✅ IMPLEMENTASI RELASI ONE-TO-MANY (User.hasMany(Presensi))
      User.hasMany(models.Presensi, { 
        foreignKey: 'userId', // Ini adalah kolom kunci asing di tabel Presensi [cite: 495]
        as: 'presensi'       // Alias yang digunakan saat melakukan eager loading [cite: 496]
      }); 
    }
  }
  User.init({
    nama: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true 
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.ENUM('mahasiswa', 'admin'), 
      allowNull: false,
      defaultValue: 'mahasiswa',
      validate: {
        isIn: [['mahasiswa', 'admin']] 
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};