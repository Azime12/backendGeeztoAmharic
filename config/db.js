const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "geez_to_amharic_full_project",
});
module.exports = pool.promise();
