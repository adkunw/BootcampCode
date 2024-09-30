// Import library yargs untuk menangani input command line
const yargs = require("yargs");

// Import fungsi dirCheck, fileCheck, add_data, save_data, dan read_data dari file utilitas dan layanan (CRUD)
const { dirCheck, fileCheck } = require("./src/utils/jsonUtils");
const {
  add_data,
  save_data,
  read_data,
  delete_data,
  update_data,
} = require("./src/services/crud");

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

// Command add
// Tujuan: Menambahkan kontak baru ke file JSON.

// Algoritma:
//  1. Ambil input nama, mobile, dan email dari command line.
//  2. Panggil fungsi read_data untuk membaca data kontak yang ada dari file JSON.
//  3. Buat objek baru dengan properti name, mobile, dan email.
//  4. Cek validasi:
//      - Mobile harus diisi.
//      - Nama tidak boleh duplikat (dengan pengecekan lowercase).
//  5. Jika validasi gagal, log error dan return false.
//  6. Jika validasi berhasil, tambahkan kontak baru ke dalam array kontak yang sudah ada.
//  7. Panggil fungsi save_data untuk menyimpan array kontak yang diperbarui ke file JSON.
//  8. Cetak pesan "Data berhasil disimpan."

//======================================================================================================================

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

// Command list
// Tujuan: Menampilkan daftar semua kontak (hanya nama dan nomor telepon).

// Algoritma:
//  1. Panggil fungsi read_data untuk membaca data kontak dari file JSON.
//  2. Cek apakah ada kontak yang tersimpan.
//  3. Jika ada kontak, untuk setiap kontak, tampilkan nama dan nomor telepon.
//  4. Cetak daftar kontak dalam format 1. Nama: John Doe, Mobile: 12345.

//======================================================================================================================

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

// Command detail
// Tujuan: Menampilkan detail lengkap satu kontak berdasarkan nama.

// Algoritma:
//  1. Ambil input nama dari command line.
//  2. Panggil fungsi read_data untuk membaca data kontak dari file JSON.
//  3. Cari kontak yang sesuai berdasarkan nama (ignoring case).
//  4. Jika kontak ditemukan, tampilkan detail kontak (nama, mobile, email).
//  5. Jika kontak tidak ditemukan, cetak pesan "Kontak dengan nama [nama] tidak ditemukan."

//======================================================================================================================

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

// Command update
// Tujuan: Memperbarui kontak yang sudah ada berdasarkan nama.

// Algoritma:
//  1. Ambil input oldNama, newNama, newMobile, dan newEmail dari command line.
//  2. Panggil fungsi read_data untuk membaca data kontak dari file JSON.
//  3. Cari kontak yang cocok dengan oldNama (ignoring case).
//  4. Jika kontak ditemukan:
//      - Cek apakah minimal satu data baru (newNama, newMobile, atau newEmail) diberikan. Jika tidak ada, cetak pesan "Harus isi data baru untuk memperbarui kontak."
//      - Jika ada data baru yang diberikan, update properti yang sesuai:
//          > Jika newNama diberikan, ubah nama kontak.
//          > Jika newMobile diberikan, ubah nomor telepon kontak.
//          > Jika newEmail diberikan, ubah email kontak (atau set jadi null jika kosong).
//      - Simpan data kontak yang telah diperbarui ke file JSON menggunakan save_data.
//      - Cetak pesan "Kontak berhasil diperbarui."
//  5. Jika kontak tidak ditemukan, cetak pesan "Kontak dengan nama [oldNama] tidak ditemukan."

//======================================================================================================================

// Command untuk menghapus kontak berdasarkan nama
yargs.command({
  command: "delete",
  describe: "Delete a contact by name",
  builder: {
    nama: {
      describe: "Contact Name",
      demandOption: true, // Nama harus diisi untuk mengidentifikasi kontak
      type: "string",
    },
  },
  handler(argv) {
    // Membaca data kontak yang ada
    const contacts = read_data(filePath);

    // Mencari kontak berdasarkan nama (case-insensitive)
    const newContacts = contacts.filter(
      (contact) => contact.name.toLowerCase() !== argv.nama.toLowerCase()
    );

    // Mengecek apakah ada kontak yang terhapus
    if (newContacts.length === contacts.length) {
      console.log(`Kontak dengan nama ${argv.nama} tidak ditemukan.`);
    } else {
      // Simpan data yang sudah diperbarui setelah penghapusan
      save_data(newContacts, filePath);
      console.log(`Kontak dengan nama ${argv.nama} berhasil dihapus.`);
    }
  },
});

// Command delete
// Tujuan: Menghapus kontak berdasarkan nama.

// Algoritma:
//  1. Ambil input nama dari command line.
//  2. Panggil fungsi read_data untuk membaca data kontak dari file JSON.
//  3. Filter kontak untuk menghapus kontak dengan nama yang sesuai (ignoring case).
//  4. Jika kontak dengan nama yang sesuai ditemukan, hapus kontak tersebut dan simpan array kontak yang telah diperbarui ke file JSON menggunakan save_data.
//  5. Cetak pesan "Kontak dengan nama [nama] berhasil dihapus."
//  6. Jika tidak ada kontak yang cocok, cetak pesan "Kontak dengan nama [nama] tidak ditemukan."

//======================================================================================================================

// Memproses command line argument yang diberikan
yargs.parse();
