// Memanggil modul Express untuk membuat aplikasi web
const express = require("express");
// Membuat instance Express
const app = express();
// Menetapkan port aplikasi (3000)
const port = 3000;
// Memanggil modul express-ejs-layouts untuk mengelola layout pada EJS (Embedded JavaScript)
const expressLayouts = require("express-ejs-layouts");

// Memanggil fungsi-fungsi dari modul utilitas JSON yang dibuat untuk mengecek direktori dan file JSON
const { dirCheck, fileCheck } = require("./src/utils/jsonUtils");
// Memanggil fungsi read_data dari modul CRUD untuk membaca data dari file JSON
const { read_data } = require("./src/services/crud");

// Tentukan path untuk direktori dan file yang akan digunakan untuk menyimpan data kontak
const dirPath = "./data"; // Path untuk direktori data
const filePath = "./data/contacts.json"; // Path untuk file JSON yang menyimpan data kontak

// Periksa apakah direktori dan file JSON ada, jika tidak maka fungsi ini akan membuatnya
dirCheck(dirPath); // Mengecek dan membuat direktori jika belum ada
fileCheck(filePath); // Mengecek dan membuat file JSON jika belum ada

// Menetapkan EJS sebagai view engine untuk merender halaman HTML
app.set("view engine", "ejs");
// Menggunakan express-ejs-layouts untuk mendukung layout EJS
app.use(expressLayouts);
app.use(express.static("public"));

app.use((req, res, next) => {
  console.log("Time :", Date.now());
  next();
});

// Route untuk halaman utama (home)
app.get("/", (req, res) => {
  // Definisikan variabel nama untuk ditampilkan di halaman utama
  const nama = "Kunto";
  // Render halaman "index2.ejs" dengan layout "main-layouts.ejs"
  res.render("index2", {
    nama, // Variabel yang dikirim ke file EJS
    layout: "layout/main-layouts", // Menetapkan layout utama
    title: "Homepage", // Title untuk halaman yang akan ditampilkan di browser
  });
});

// Route untuk halaman About
app.get("/about", (req, res) => {
  try {
    // Misalkan kamu memang tidak punya file about3.ejs
    res.render("about2", {
      layout: "layout/main-layouts", // Menggunakan layout utama
      title: "About Page", // Title untuk halaman about
    });
  } catch (error) {
    // Ini akan tertangkap jika file "about3.ejs" tidak ada atau terjadi kesalahan saat rendering
    console.log("page error:", error.message); // Muncul error beserta pesannya
    res.status(500).send("Terjadi kesalahan pada halaman About");
  }
});

// Route untuk halaman Contact
app.get("/contact", (req, res) => {
  // Membaca data kontak dari file JSON
  contacts = read_data(filePath);
  // Render halaman "contact2.ejs" dengan data kontak yang dibaca dari JSON dan layout utama
  res.render("contact2", {
    contacts, // Data kontak yang dikirim ke file EJS
    layout: "layout/main-layouts", // Menggunakan layout utama
    title: "Contact Page", // Title untuk halaman contact
  });
});

// Route dinamis untuk produk berdasarkan product ID dan optional category ID (dengan query string)
app.get("/product/:prodID", (req, res) => {
  // Mengirim response dengan product ID yang diterima dari URL dan category ID dari query string
  res.send(
    `product ID : ${req.params.prodID} <br>category ID : ${req.query.catID}`
  );
});

// Route untuk menangani halaman yang tidak ditemukan (404 error)
app.use("/", (req, res) => {
  // Mengatur status response ke 404 (page not found)
  res.status(404);
  // Mengirim pesan error "page not found" ke browser
  res.send("page not found : 404");
});

// Menjalankan server Express pada port yang telah ditetapkan
app.listen(port, () => {
  // Menampilkan pesan ke console ketika server berhasil dijalankan
  console.log(`App listening on port ${port}`);
});
