const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const geolocation = require("./geolocation");
const publicpathdir = path.join(__dirname, "../web-servers/public");
const template = path.join(__dirname, "../web-servers/public/template/views");
const port = process.env.PORT || 3000;
const partials = path.join(
  __dirname,
  "../web-servers/public/template/partials"
);
// console.log(publicpathdir);
app.set("view engine", "hbs");
app.set("views", template);
hbs.registerPartials(partials);
app.use(express.static(publicpathdir));
app.get("", (req, res) => {
  res.render("index", {
    name: "Mummy",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    name: "Madhav",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message: "deda ko help krde bhai",
    name: "Pratyush",
  });
});
app.get("/weather", (req, res) => {
  // console.log(req.query);
  if (!req.query.address) {
    return res.send({ error: "You must provide a address" });
  } else {
    geolocation(req.query.address, (error, data) => {
      if (error) {
        res.send({ error });
      } else {
        res.send(data);
      }
    });
  }
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    errormessage: "No help page found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errormessage: "No page found",
  });
});

app.listen(port, () => {
  console.log("Running port 3000");
});
