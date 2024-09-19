const http = require("http");
const fs = require("fs");

const renderHTML = (path, res) => {
  fs.readFile(path, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.write("Error: Page not found");
      console.log(err);
      res.end();
    } else {
      res.write(data);
      res.end();
    }
  });
};

http
  .createServer((req, res) => {
    const url = req.url;
    console.log(url);

    if (url === "/about") {
      renderHTML("./src/page/about.html", res);
    } else if (url === "/contact") {
      renderHTML("./src/page/contact.html", res);
    } else if (url === "/") {
      renderHTML("./src/page/index.html", res);
    } else {
      res.writeHead(404);
      res.write("Error: Page not found");
      console.log(err);
      res.end();
    }
  })
  .listen(3000, () => {
    console.log("Server is listening on port 3000");
  });
