const validator = require("validator");

const { add_data, save_data } = require("./src/services/crud");
const { question, rl } = require("./src/services/question");
const { dirCheck, fileCheck } = require("./src/utils/jsonUtils");

const dirPath = "./data";
const filePath = "./data/contacts.json";

dirCheck(dirPath);
fileCheck(filePath);

// Fungsi untuk validasi input mobile
async function getValidMobile() {
  let mobile;
  do {
    mobile = await question("Berapa nomor telp kamu? ");
    if (!validator.isMobilePhone(mobile, "id-ID")) {
      console.log(
        "Nomor telepon tidak valid. Silakan masukkan nomor telepon yang benar."
      );
    }
  } while (!validator.isMobilePhone(mobile, "id-ID"));
  return mobile;
}

// Fungsi untuk validasi input email
async function getValidEmail() {
  let email;
  do {
    email = await question("Apa email kamu? ");
    if (!validator.isEmail(email)) {
      console.log(
        "Alamat email tidak valid. Silakan masukkan alamat email yang benar."
      );
    }
  } while (!validator.isEmail(email));
  return email;
}

// Gunakan async/await untuk mengelola input pengguna
(async () => {
  const name = await question("Siapa nama kamu? ");
  const mobile = await getValidMobile(); // Validasi nomor telepon
  const email = await getValidEmail(); // Validasi email

  const data = add_data(name, mobile, email, filePath);
  save_data(data, filePath);

  console.log("Data berhasil disimpan ke dalam contacts.json");

  rl.close();
})();
