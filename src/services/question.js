const readline = require("node:readline");
const { stdin: input, stdout: output } = require("node:process");

// Membuat interface untuk membaca input dari command line
const rl = readline.createInterface({ input, output });

// Fungsi question yang menggunakan Promise
function question(ask) {
  return new Promise((resolve) => {
    rl.question(ask, (answer) => {
      resolve(answer); // Mengembalikan jawaban ke Promise
    });
  });
}

// EXPORT FUNCTION
module.exports = {
  question,
  rl,
};
