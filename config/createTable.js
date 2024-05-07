const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "MYSQL8010.site4now.net",
  user: "aa8624_zmerawi",
  password: "Alemu@9393",
  database: "db_aa8624_zmerawi",
});

const createUserTableQuery = `
  CREATE TABLE IF NOT EXISTS text_file (
    id INT AUTO_INCREMENT PRIMARY KEY,
    geez LONGTEXT,
    amharic LONGTEXT,
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES user(user_id)
  )
`;
// const createUserTableQuery = `
//   CREATE TABLE IF NOT EXISTS admin (
//     admin_id INT AUTO_INCREMENT PRIMARY KEY,
//     first_name VARCHAR(100),
//     last_name VARCHAR(100),
//     email VARCHAR(100),
//     password VARCHAR(100)
//   )
// `;
// const createUserTableQuery = `
//   CREATE TABLE IF NOT EXISTS user (
//     user_id INT AUTO_INCREMENT PRIMARY KEY,
//     full_name VARCHAR(100),
//     email VARCHAR(100),
//     password VARCHAR(100)
//   )
// `;

connection.query(createUserTableQuery, (err) => {
  if (err) {
    console.error("Error creating Table", err);
    return;
  }

  console.log("Table created successfully");
});

connection.end((err) => {
  if (err) {
    console.error("Error ending database connection:", err);
    return;
  }

  console.log("Database connection ended");
});
