// Import library yargs untuk menangani input command line
const yargs = require("yargs");

// Import fungsi dirCheck, fileCheck, add_data, save_data, dan read_data dari file utilitas dan layanan (CRUD)
const { dirCheck, fileCheck } = require("./src/utils/jsonUtils");
const { add_data, save_data, read_data } = require("./src/services/crud");

// Tentukan path untuk direktori dan file yang akan digunakan untuk menyimpan data kontak
const dirPath = "./data";
const filePath = "./data/contacts.json";

// Periksa apakah direktori dan file JSON ada, jika tidak maka akan dibuat
dirCheck(dirPath);
fileCheck(filePath);

// Command pertama: 'add' untuk menambahkan kontak baru
yargs.command({
  command: "add", // Nama command
  describe: "add new contact", // Deskripsi command
  builder: {
    // Pengaturan argumen yang dibutuhkan untuk command 'add'
    nama: {
      describe: "Contact Name", // Deskripsi untuk argumen 'nama'
      demandOption: true, // Harus diisi
      type: "string", // Tipe data harus string
    },
    mobile: {
      describe: "Contact Phone Number", // Deskripsi untuk argumen 'mobile'
      demandOption: true, // Harus diisi
      type: "string", // Tipe data harus string
    },
    email: {
      describe: "Contact Email", // Deskripsi untuk argumen 'email'
      demandOption: false, // Email opsional
      type: "string", // Tipe data harus string
    },
  },
  // Fungsi yang dieksekusi ketika command 'add' dijalankan
  handler(argv) {
    // Memanggil fungsi add_data untuk menambahkan kontak baru
    const contact = add_data(argv.nama, argv.mobile, argv.email, filePath);
    if (contact) {
      // Jika kontak berhasil divalidasi, simpan ke dalam file
      save_data(contact, filePath);
      console.log("Data berhasil disimpan.");
    }
  },
});

// Command kedua: 'list' untuk menampilkan seluruh daftar kontak
yargs.command({
  command: "list", // Nama command
  describe: "List all contacts (only name and mobile number)", // Deskripsi command
  handler() {
    // Memanggil fungsi read_data untuk membaca data dari file
    const contacts = read_data(filePath);
    console.log("Daftar Kontak:");
    // Loop melalui semua kontak dan tampilkan nama serta nomor telepon
    contacts.forEach((contact, index) => {
      console.log(
        `${index + 1}. Nama: ${contact.name}, Mobile: ${contact.mobile}`
      );
    });
  },
});

// Command ketiga: 'detail' untuk menampilkan detail lengkap dari satu kontak berdasarkan nama
yargs.command({
  command: "detail", // Nama command
  describe: "Show contact details based on name", // Deskripsi command
  builder: {
    // Pengaturan argumen yang dibutuhkan untuk command 'detail'
    nama: {
      describe: "Contact Name", // Deskripsi untuk argumen 'nama'
      demandOption: true, // Nama harus diisi
      type: "string", // Tipe data harus string
    },
  },
  // Fungsi yang dieksekusi ketika command 'detail' dijalankan
  handler(argv) {
    // Memanggil fungsi read_data untuk membaca data dari file
    const contacts = read_data(filePath);
    // Mencari kontak berdasarkan nama (case-insensitive)
    const contact = contacts.find(
      (c) => c.name.toLowerCase() === argv.nama.toLowerCase()
    );

    if (contact) {
      // Jika kontak ditemukan, tampilkan detailnya
      console.log("Detail Kontak:");
      console.log(`Nama: ${contact.name}`);
      console.log(`Mobile: ${contact.mobile}`);
      console.log(`Email: ${contact.email || "Tidak ada email"}`);
    } else {
      // Jika kontak tidak ditemukan, tampilkan pesan kesalahan
      console.log(`Kontak dengan nama ${argv.nama} tidak ditemukan.`);
    }
  },
});

// Command untuk memperbarui data kontak (hanya update field yang diberikan)
yargs.command({
  command: "update",
  describe: "Update an existing contact",
  builder: {
    oldNama: {
      describe: "Old Contact Name",
      demandOption: true, // Nama lama harus diisi untuk identifikasi kontak
      type: "string",
    },
    newNama: {
      describe: "New Contact Name",
      demandOption: false, // Nama baru opsional
      type: "string",
    },
    newMobile: {
      describe: "New Contact Phone Number",
      demandOption: false, // Mobile baru opsional
      type: "string",
    },
    newEmail: {
      describe: "New Contact Email",
      demandOption: false, // Email baru opsional
      type: "string",
    },
  },
  handler(argv) {
    // Membaca data kontak yang ada
    const contacts = read_data(filePath);

    // Mencari kontak berdasarkan nama lama (case-insensitive)
    const contactIndex = contacts.findIndex(
      (c) => c.name.toLowerCase() === argv.oldNama.toLowerCase()
    );

    // Jika kontak ditemukan
    if (contactIndex !== -1) {
      // Mengecek apakah ada data baru yang diberikan
      const isNewDataProvided = argv.newNama || argv.newMobile || argv.newEmail;

      // Jika tidak ada data baru yang diberikan, tampilkan pesan error
      if (!isNewDataProvided) {
        console.log("Harus isi data baru untuk memperbarui kontak.");
        return;
      }

      // Hanya update field yang diberikan (jika ada)
      if (argv.newNama) {
        contacts[contactIndex].name = argv.newNama;
      }
      if (argv.newMobile) {
        contacts[contactIndex].mobile = argv.newMobile;
      }
      if (argv.newEmail) {
        contacts[contactIndex].email = argv.newEmail || null;
      }

      // Simpan kembali data yang telah diperbarui
      save_data(contacts, filePath);
      console.log("Kontak berhasil diperbarui.");
    } else {
      console.log(`Kontak dengan nama ${argv.oldNama} tidak ditemukan.`);
    }
  },
});

// Memproses command line argument yang diberikan
yargs.parse();
