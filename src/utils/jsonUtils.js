const fs = require("fs");

// const dirPath = "../../data";
// const filePath = "../../data/contacts.json";

function dirCheck(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath);
  }
}

function fileCheck(filePath) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]", "utf-8");
  }
}

module.exports = {
  dirCheck,
  fileCheck,
};
