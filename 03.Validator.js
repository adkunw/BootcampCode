const validator = require("validator");
const fs = require("fs");
const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

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

      // Membuat objek yang berisi data yang dimasukkan oleh pengguna
      const result = { name, mobile, email };

      const file = fs.readFileSync("data/contacts.json", "utf-8");
      const contacts = JSON.parse(file);
      contacts.push(result);

      // Menyimpan objek sebagai JSON string ke dalam file "test.txt"
      fs.writeFileSync("data/contacts.json", JSON.stringify(contacts));

      // Menutup interface readline
      rl.close();

      console.log("Data berhasil disimpan ke dalam test.txt");
    });
  });
});
