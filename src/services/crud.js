const fs = require("fs");

//FUNCTION ADD DATA
function add_data(name, mobile, email, filePath) {
  const result = { name, mobile, email };

  const file = fs.readFileSync(filePath, "utf-8");
  const contacts = JSON.parse(file);
  contacts.push(result);
  return contacts;
}

//FUNCTION SAVE DATA
function save_data(data, filePath) {
  fs.writeFileSync(filePath, JSON.stringify(data));
}

// EXPORT FUNCTION
module.exports = {
  add_data,
  save_data,
};
