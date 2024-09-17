const fs = require("fs");
const validator = require("validator");

// FUNCTION READ DATA
function read_data(filePath) {
  try {
    const file = fs.readFileSync(filePath, "utf-8");
    const contacts = JSON.parse(file);
    return contacts;
  } catch (error) {
    console.error("Error reading the file:", error);
    return []; // Mengembalikan array kosong jika file tidak dapat dibaca
  }
}

// FUNCTION ADD DATA
function add_data(name, mobile, email, filePath) {
  // Baca data dari file
  const contacts = read_data(filePath);

  const low = name.toLowerCase();

  // Validasi: cek apakah nama sudah ada di kontak
  const isNameExist = contacts.some(
    (contact) => contact.name.toLowerCase() === low
  );
  if (isNameExist) {
    console.log(`Nama ${name} sudah ada. Silakan gunakan nama lain.`);
    return false; // Jika nama sudah ada, return false
  }

  // Validasi nomor telepon
  if (!validator.isMobilePhone(mobile, "id-ID")) {
    console.log(
      "Nomor telepon tidak valid. Silakan masukkan nomor yang benar."
    );
    return false; // Jika nomor tidak valid, return false
  }

  // Validasi email jika diberikan
  if (email && !validator.isEmail(email)) {
    console.log("Alamat email tidak valid. Silakan masukkan email yang benar.");
    return false; // Jika email tidak valid, return false
  }

  // Jika validasi berhasil, tambahkan data ke kontak
  const result = { name, mobile, email: email || null }; // Simpan null jika email tidak ada
  contacts.push(result);
  return contacts;
}

// FUNCTION SAVE DATA
function save_data(data, filePath) {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

// EXPORT FUNCTION
module.exports = {
  add_data,
  save_data,
  read_data,
};
