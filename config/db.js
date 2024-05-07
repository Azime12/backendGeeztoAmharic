const mysql = require("mysql2");
require("dotenv").config();

const pool = mysql.createPool({
  host: "MYSQL8010.site4now.net",
  user: "aa8624_zmerawi",
  password: "Alemu@9393",
  database: "db_aa8624_zmerawi",
});
module.exports = pool.promise();
