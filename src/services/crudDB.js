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
  save_data(contacts, filePath); // Simpan perubahan
  return true; // Kembalikan true jika berhasil
}

// FUNCTION SAVE DATA
function save_data(data, filePath) {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

// FUNCTION DELETE DATA
function delete_data(name, filePath) {
  // Baca data dari file
  const contacts = read_data(filePath);

  // Mencari kontak berdasarkan nama (case-insensitive)
  const newContacts = contacts.filter(
    (contact) => contact.name.toLowerCase() !== name.toLowerCase()
  );

  // Mengecek apakah ada kontak yang terhapus
  if (newContacts.length === contacts.length) {
    console.log(`Kontak dengan nama ${name} tidak ditemukan.`);
    return false; // Kembalikan false jika tidak ditemukan
  } else {
    save_data(newContacts, filePath); // Simpan data yang sudah diperbarui setelah penghapusan
    console.log(`Kontak dengan nama ${name} berhasil dihapus.`);
    return true; // Kembalikan true jika berhasil
  }
}

// FUNCTION UPDATE DATA
function update_data(oldName, newName, mobile, email, filePath) {
  // Baca data dari file
  const contacts = read_data(filePath);

  // Mencari index kontak yang akan diupdate
  const index = contacts.findIndex(
    (contact) => contact.name.toLowerCase() === oldName.toLowerCase()
  );

  if (index === -1) {
    console.log(`Kontak dengan nama ${oldName} tidak ditemukan.`);
    return false; // Kembalikan false jika tidak ditemukan
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

  // Update data kontak
  contacts[index] = {
    name: newName || contacts[index].name,
    mobile: mobile || contacts[index].mobile,
    email: email || contacts[index].email,
  };

  save_data(contacts, filePath); // Simpan perubahan
  console.log(`Kontak ${oldName} berhasil diperbarui.`);
  return true; // Kembalikan true jika berhasil
}

// EXPORT FUNCTION
module.exports = {
  add_data,
  save_data,
  read_data,
  delete_data,
  update_data,
};
