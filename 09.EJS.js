const express = require("express");
const { questionNewPassword } = require("readline-sync");
const app = express();
const port = 3000;

const { dirCheck, fileCheck } = require("./src/utils/jsonUtils");
const { read_data } = require("./src/services/crud");

// Tentukan path untuk direktori dan file yang akan digunakan untuk menyimpan data kontak
const dirPath = "./data";
const filePath = "./data/contacts.json";

// Periksa apakah direktori dan file JSON ada, jika tidak maka akan dibuat
dirCheck(dirPath);
fileCheck(filePath);

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  //   res.send("Hello World!");
  //   res.sendFile("./src/page/index.html", { root: __dirname });
  const nama = "Kunto";
  res.render("index", { nama, title: "Homepage" });
});

app.get("/about", (req, res) => {
  //   res.send("About Page!");
  // res.sendFile("./src/page/about.html", { root: __dirname });
  res.render("about", { title: "About Page" });
});

app.get("/contact", (req, res) => {
  //   res.send("Contact Page!");
  // res.sendFile("./src/page/contact.html", { root: __dirname });
  contacts = read_data(filePath);
  res.render("contact", { contacts, title: "Contact Page" });
});

app.get("/product/:prodID", (req, res) => {
  res.send(
    `product ID : ${req.params.prodID} <br>category ID : ${req.query.catID}`
  );
});

app.use("/", (req, res) => {
  res.status(404);
  res.send("page not found : 404");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
