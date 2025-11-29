'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Presensis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        // ✅ KONFIGURASI FOREIGN KEY KE TABEL 'Users'
        references: {
          model: 'Users', // Merujuk ke tabel Users [cite: 506]
          key: 'id',      // Merujuk ke kolom id di tabel Users [cite: 506]
        },
        onUpdate: 'CASCADE', // Opsi untuk relasi saat update [cite: 506]
        onDelete: 'CASCADE', // Opsi untuk relasi saat delete [cite: 506]
      },
      // ❌ KOLOM 'nama' DIHAPUS (karena diambil melalui relasi)
      
      checkIn: {
        allowNull: false,
        type: Sequelize.DATE
      },
      checkOut: {
        allowNull: true, 
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Presensis');
  }
};