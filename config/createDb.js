require("dotenv").config();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
});

connection.query("CREATE DATABASE geez_to_amharic_full_project", (err) => {
  if (err) {
    console.error("Error creating database:", err);
    return;
  }

  console.log("Database created successfully");
});

connection.end((err) => {
  if (err) {
    console.error("Error ending database connection:", err);
    return;
  }

  console.log("Database connection ended");
});
