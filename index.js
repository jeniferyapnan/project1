// Import library yang dibutuhin
const express = require('express');
const fs = require('fs');
const path = require('path'); // Peta buat nyari file

// Inisialisasi aplikasi server
const app = express();

// Bikin endpoint utama
app.get('/api/jkt48', (req, res) => {
  // --- INI BAGIAN YANG DIPERBAIKI ---
  // Kita suruh dia nyari db.json di 'kamar' yang sama dengan index.js
  const dbPath = path.join(__dirname, 'db.json');

  // Baca file 'db.json' pake alamat yang udah bener
  fs.readFile(dbPath, 'utf8', (err, data) => {
    if (err) {
      console.error("Waduh, gabisa baca db.json:", err);
      return res.status(500).json({ error: 'Gagal mengambil data dari database.', details: err.message });
    }
    
    try {
      const database = JSON.parse(data);
      const images = database.jkt48;

      if (!images || images.length === 0) {
        return res.status(404).json({ error: 'Database gambar kosong.' });
      }

      const randomIndex = Math.floor(Math.random() * images.length);
      const randomImage = images[randomIndex];

      res.json({
        creator: 'Nama Lo Di Sini',
        url: randomImage
      });
    } catch (parseError) {
      console.error("Error pas parsing JSON:", parseError);
      return res.status(500).json({ error: 'Format data di db.json salah.', details: parseError.message });
    }
  });
});

// Endpoint buat ngetes
app.get('/', (req, res) => {
  res.send('Server API JKT48 buat Vercel udah nyala! (Versi Perbaikan Final)');
});

// Jalanin servernya
module.exports = app;
