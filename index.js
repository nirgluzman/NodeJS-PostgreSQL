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

// GET  /  : To get all the users
app.get("/api/users", (req, res) => {
  pool
    .query("SELECT * FROM users")
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// GET  /:id :  To get one user (with the id)
app.get("/api/users/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query(`SELECT * FROM users WHERE id=$1`, [id])
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// POST / -> To create a new user
app.post("/api/users", (req, res) => {
  const { first_name, last_name, age } = req.body;
  pool
    .query(
      "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *",
      [first_name, last_name, age]
    )
    .then((data) => res.status(201).json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// PUT /:id  :  To edit one user (with the id)
app.put("/api/users/:id", (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, age } = req.body;
  pool
    .query(
      "UPDATE users SET first_name=$2, last_name=$3, age=$4 WHERE id=$1 RETURNING *",
      [id, first_name, last_name, age]
    )
    .then((data) => res.status(204).json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// DELETE  /:id : To delete one user (with the id)
app.delete("/api/users/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("UPDATE users SET active=false WHERE id=$1 RETURNING *", [id])
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// GET  /  : To get all the orders
app.get("/api/orders", (req, res) => {
  pool
    .query("SELECT * FROM orders")
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// GET  /:id :  To get one order (with the id)
app.get("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query(`SELECT * FROM orders WHERE id=$1`, [id])
    .then((data) => res.json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// POST / -> To create a new order
app.post("/api/orders", (req, res) => {
  const { price, date, user_id } = req.body;
  pool
    .query(
      "INSERT INTO orders (price, date, user_id) VALUES ($1, $2, $3) RETURNING *",
      [price, date, user_id]
    )
    .then((data) => res.status(201).json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// PUT /:id  :  To edit one order (with the id)
app.put("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const { price, date, user_id } = req.body;
  pool
    .query(
      "UPDATE orders SET price=$2, date=$3, user_id=$4 WHERE id=$1 RETURNING *",
      [id, price, date, user_id]
    )
    .then((data) => res.status(204).json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// DELETE  /:id : To delete one order (with the id)
app.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  pool
    .query("DELETE FROM orders WHERE id=$1 RETURNING *", [id])
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// GET /:id/orders : To get all orders linked to a specific user
app.get("/api/users/:id/orders", (req, res) => {
  const { id } = req.params;
  pool
    .query(`SELECT * FROM orders WHERE user_id=$1`, [id])
    .then((data) => res.status(200).json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});

// PUT /:id/check-inactive : If a user has never ordered, he should be set as inactive
app.put("/api/users/:id/check-inactive", (req, res) => {
  const { id } = req.params;
  pool
    .query(
      "UPDATE users SET active=false WHERE id=$1 AND NOT EXISTS (SELECT * FROM orders WHERE user_id=$1) RETURNING *",
      [id]
    )
    .then((data) => res.status(204).json(data.rows))
    .catch((err) => {
      console.log(err.message);
      res.sendStatus(404);
    });
});
