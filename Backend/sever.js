const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mysql = require("mysql2/promise");


const app = express();
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "campus_event",
  port: 3306
});

db.getConnection()
  .then(connection => {
    console.log("MySQL connected successfully");
    connection.release();
  })
  .catch(error => {
    console.log("MySQL connection failed:", error);
  });


app.use(cors());
app.use(express.json());
app.get("/users", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const sql = `
      INSERT INTO users (name, email, password, role)
      VALUES (?, ?, ?, ?)
    `;

    const [result] = await db.query(sql, [
      name,
      email,
      password,
      role
    ]);

    

    res.status(201).json({
      message: "User created successfully",
      userId: result.insertId
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query(
      "SELECT * FROM users WHERE email = ? AND password = ?",
      [email, password]
    );

    if (rows.length === 0) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    res.json({
      message: "Login successful",
      user: rows[0]
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

app.get("/", (req, res) => {555
    res.send("Campus Event Management Backend is Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});