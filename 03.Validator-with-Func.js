const validator = require("validator");
const fs = require("fs");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

const { add_data, save_data } = require("./src/services/crud");

// Membuat interface untuk membaca input dari command line
const rl = readline.createInterface({ input, output });

// Mengajukan pertanyaan pertama kepada pengguna
rl.question("Siapa nama kamu? ", (name) => {
  // Mengajukan pertanyaan kedua setelah jawaban pertama diterima
  rl.question("Berapa nomor telp kamu? ", (mobile) => {
    // Mengajukan pertanyaan ketiga setelah jawaban kedua diterima
    rl.question("Apa email kamu? ", (email) => {
      // Pengecekan format nomor telepon dan email
      if (!validator.isMobilePhone(mobile, "id-ID")) {
        console.log("Format nomor telepon anda salah");
        rl.close();
        return;
      }

      if (!validator.isEmail(email)) {
        console.log("Format email anda salah");
        rl.close();
        return;
      }

      const data = add_data(name, mobile, email);
      save_data(data);

      rl.close();

      console.log("Data berhasil disimpan ke dalam contacts.json");
    });
  });
});
