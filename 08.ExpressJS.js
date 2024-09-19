const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  //   res.send("Hello World!");
  res.sendFile("./src/page/index.html", { root: __dirname });
});

app.get("/about", (req, res) => {
  //   res.send("About Page!");
  res.sendFile("./src/page/about.html", { root: __dirname });
});

app.get("/contact", (req, res) => {
  //   res.send("Contact Page!");
  res.sendFile("./src/page/contact.html", { root: __dirname });
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
