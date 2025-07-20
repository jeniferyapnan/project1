// Import library yang dibutuhin
const express = require('express');
const fs = require('fs');

// Inisialisasi aplikasi server
const app = express();
const PORT = 3000;

// Bikin endpoint utama
app.get('/api/jkt48', (req, res) => {
  // Baca file 'db.json'
  fs.readFile('db.json', 'utf8', (err, data) => {
    if (err) {
      console.error("Error baca db.json:", err);
      return res.status(500).json({ error: 'Gagal mengambil data.' });
    }
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
  });
});

// Endpoint buat ngetes
app.get('/', (req, res) => {
  res.send('Server API JKT48 buat Vercel udah nyala!');
});

// Jalanin servernya (Vercel bakal ngurus ini secara otomatis)
module.exports = app;
