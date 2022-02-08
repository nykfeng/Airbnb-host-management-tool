import axios from "axios";
import chalk from "chalk";
import * as fs from "fs";
import "dotenv/config";
import express from "express";

import { auth } from "express-openid-connect";
import epkg from "express-openid-connect";

const { requiresAuth } = epkg;

const app = express();

app.use(express.static("./"));
const indexPage = fs.readFileSync(`./public/index.html`, "utf-8");

const PORT = process.env.PORT || 1818;

app.use(
  auth({
    authRequired: false, // Do not want this for every route
    auth0Logout: true,

    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

app.get("/", (req, res) => {
  console.log("Got a request! Now sending the index page.");

  res.send(indexPage);
  // res.send(req.oidc.isAuthenticated() ? "Logged in" : "logged out");
});

app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${chalk.bgBlack.inverse(PORT)}`);
});
