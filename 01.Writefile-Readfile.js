// Memanggil modul file system (fs) bawaan Node.js
const fs = require("fs");

// Menggunakan fungsi writeFileSync untuk menulis teks "Serius saya ganteng" ke dalam file bernama "test.txt"
// Fungsi ini bersifat sinkron, sehingga program akan berhenti sementara hingga penulisan file selesai.
fs.writeFileSync("test.txt", "Serius saya ganteng");

// Menggunakan fungsi readFile untuk membaca isi file "test.txt"
// Fungsi ini bersifat asinkron, jadi pembacaan file akan berlangsung di background dan program bisa melanjutkan kode lainnya sementara menunggu hasil pembacaan.
// Parameter pertama adalah nama file, kedua adalah encoding yang digunakan (dalam hal ini "utf-8"), dan ketiga adalah callback function yang akan dijalankan setelah file dibaca.
fs.readFile("test.txt", "utf-8", (err, data) => {
  // Jika terjadi error saat membaca file, maka error akan dilempar (throw err)
  if (err) throw err;

  // Jika tidak ada error, isi file (data) akan dicetak ke console
  console.log(data);
});
