const validator = require("validator");
const pool = require("../../db");

// FUNCTION READ DATA
async function read_data() {
  try {
    const contactList = await pool.query(`SELECT * FROM contacts`);
    return contactList.rows; // Mengembalikan hasil query
  } catch (error) {
    console.error("Error reading the data:", error);
    return []; // Mengembalikan array kosong jika terjadi kesalahan
  }
}

// FUNCTION GET SINGLE DATA BY NAME
async function get_data_by_name(name) {
  try {
    const result = await pool.query(
      `SELECT * FROM contacts WHERE LOWER(name) = LOWER($1)`,
      [name]
    );
    return result.rows[0] || null; // Mengembalikan objek kontak atau null jika tidak ditemukan
  } catch (error) {
    console.error("Error getting the contact by name:", error);
    return null; // Mengembalikan null jika terjadi kesalahan
  }
}

// FUNCTION ADD DATA
async function add_data(name, mobile, email) {
  try {
    // Validasi nomor telepon
    if (!validator.isMobilePhone(mobile, "id-ID")) {
      console.log(
        "Nomor telepon tidak valid. Silakan masukkan nomor yang benar."
      );
      return false; // Jika nomor tidak valid, return false
    }

    // Validasi email jika diberikan
    if (email && !validator.isEmail(email)) {
      console.log(
        "Alamat email tidak valid. Silakan masukkan email yang benar."
      );
      return false; // Jika email tidak valid, return false
    }

    // Cek apakah nama sudah ada di database
    const existingContact = await get_data_by_name(name); // Menggunakan fungsi baru

    if (existingContact) {
      console.log(`Nama ${name} sudah ada. Silakan gunakan nama lain.`);
      return false; // Jika nama sudah ada, return false
    }

    // Jika validasi berhasil, tambahkan data ke kontak
    await pool.query(
      `INSERT INTO contacts (name, mobile, email) VALUES ($1, $2, $3)`,
      [name, mobile, email || null]
    );
    console.log(`Kontak ${name} berhasil ditambahkan.`);
    return true; // Kembalikan true jika berhasil
  } catch (error) {
    console.error("Error adding the contact:", error);
    return false; // Mengembalikan false jika terjadi kesalahan
  }
}

// FUNCTION DELETE DATA
async function delete_data(name) {
  try {
    const result = await pool.query(
      `DELETE FROM contacts WHERE LOWER(name) = LOWER($1) RETURNING *`,
      [name]
    );

    if (result.rowCount === 0) {
      console.log(`Kontak dengan nama ${name} tidak ditemukan.`);
      return false; // Kembalikan false jika kontak tidak ditemukan
    }

    console.log(`Kontak dengan nama ${name} berhasil dihapus.`);
    return true; // Kembalikan true jika berhasil
  } catch (error) {
    console.error("Error deleting the contact:", error);
    return false; // Mengembalikan false jika terjadi kesalahan
  }
}

// FUNCTION UPDATE DATA
async function update_data(oldName, newName, mobile, email) {
  try {
    // Validasi nomor telepon
    if (mobile && !validator.isMobilePhone(mobile, "id-ID")) {
      console.log(
        "Nomor telepon tidak valid. Silakan masukkan nomor yang benar."
      );
      return false; // Jika nomor tidak valid, return false
    }

    // Validasi email jika diberikan
    if (email && !validator.isEmail(email)) {
      console.log(
        "Alamat email tidak valid. Silakan masukkan email yang benar."
      );
      return false; // Jika email tidak valid, return false
    }

    // Mencari kontak berdasarkan nama (case-insensitive)
    const result = await pool.query(
      `UPDATE contacts 
       SET name = $1, mobile = $2, email = $3 
       WHERE LOWER(name) = LOWER($4) RETURNING *`,
      [newName || oldName, mobile || null, email || null, oldName]
    );

    if (result.rowCount === 0) {
      console.log(`Kontak dengan nama ${oldName} tidak ditemukan.`);
      return false; // Kembalikan false jika kontak tidak ditemukan
    }

    console.log(`Kontak ${oldName} berhasil diperbarui.`);
    return true; // Kembalikan true jika berhasil
  } catch (error) {
    console.error("Error updating the contact:", error);
    return false; // Mengembalikan false jika terjadi kesalahan
  }
}

// EXPORT FUNCTION
module.exports = {
  add_data,
  read_data,
  delete_data,
  update_data,
  get_data_by_name,
};
