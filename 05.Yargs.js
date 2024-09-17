const yargs = require("yargs");
const { dirCheck, fileCheck } = require("./src/utils/jsonUtils");
const { add_data, save_data } = require("./src/services/crud");

const dirPath = "./data";
const filePath = "./data/contacts.json";

dirCheck(dirPath);
fileCheck(filePath);

yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    nama: {
      describe: "Contact Name",
      demandOption: true,
      type: "string",
    },
    mobile: {
      describe: "Contact Phone Number",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "Contact Email",
      demandOption: false,
      type: "string",
    },
  },
  handler(argv) {
    const contact = add_data(argv.nama, argv.mobile, argv.email, filePath);
    if (contact) {
      // Jika validasi berhasil, simpan datanya
      save_data(contact, filePath);
      console.log("Data berhasil disimpan.");
    }
  },
});

yargs.parse();
