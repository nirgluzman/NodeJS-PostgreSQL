require("dotenv").config();
const express = require("express");
const { Pool } = require("pg");

const pool = new Pool();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});

app.get("/", (req, res) => {
  res.send("Welcome!");
});
