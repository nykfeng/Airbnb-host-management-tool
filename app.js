// const bodyEl = document.querySelector("body");
// const stockEl = document.querySelector(".stock");
import axios from "axios";
import chalk from "chalk";
import * as fs from "fs";
import "dotenv/config";
import express from "express";

import openid from "express-openid-connect";

const app = express();
const indexPage = fs.readFileSync(`./public/index.html`, "utf-8");

const PORT = process.env.PORT || 1818;

app.get("/", (req, res) => {
  console.log("Got a request! Now sending the index page.");

  res.send(indexPage);
});

app.get("/login", (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.get("/profile", openid.requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});


app.listen(PORT, () => {
  console.log(`Server is running on port: ${chalk.bgBlack.inverse(PORT)}`);
});
