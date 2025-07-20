// Import library yang dibutuhin
const express = require('express'); // Buat bikin server
const fs = require('fs');         // Buat baca file

// Inisialisasi aplikasi server
const app = express();
const PORT = 3000; // Server bakal jalan di port 3000

// Bikin endpoint (URL khusus) buat diakses bot
// Alamatnya nanti bakal jadi: URL_REPLIT_LO/api/jkt48
app.get('/api/jkt48', (req, res) => {
  // Baca file 'db.json'
  fs.readFile('db.json', 'utf8', (err, data) => {
    // Kalo gagal baca file, kasih tau di konsol dan kirim error
    if (err) {
      console.error("Waduh, gabisa baca db.json:", err);
      return res.status(500).json({ error: 'Gagal ngambil data.' });
    }

    // Ubah data dari teks jadi format yang bisa dibaca JavaScript
    const database = JSON.parse(data);
    const images = database.jkt48;

    // Kalo databasenya kosong, kasih error
    if (!images || images.length === 0) {
      return res.status(404).json({ error: 'Database gambar kosong, bro.' });
    }

    // Ambil satu link gambar secara acak dari database
    const randomIndex = Math.floor(Math.random() * images.length);
    const randomImage = images[randomIndex];

    // Kirim respons ke yang minta (bot lo) dalam format JSON
    res.json({
      creator: 'Nama Lo Di Sini', // Ganti pake nama lo
      url: randomImage,
      source: 'jkt48-database'
    });
  });
});

// Bikin endpoint buat ngetes doang, biar tau servernya nyala
app.get('/', (req, res) => {
  res.send('Server API JKT48 udah nyala, bre! Coba akses /api/jkt48');
});

// Jalanin servernya
app.listen(PORT, () => {
  console.log(`Server API jalan di http://localhost:${PORT}`);
});
