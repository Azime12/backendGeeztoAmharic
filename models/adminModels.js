// const db = require("../config/db");

// const User = {};

// Admin.register = async (
//   Shemachoch_name,
//   email,
//   phone_Number,
//   city,
//   sub_city,
//   wereda,
//   hashedPassword
// ) => {
//   try {
//     const query =
//       "INSERT INTO admin (Shemachoch_name, email, phone_Number, city,sub_city, wereda, password) VALUES (?, ?, ?, ?, ?, ?, ?)";

//     const [result] = await db.execute(query, [
//       Shemachoch_name,
//       email,
//       phone_Number,
//       city,
//       sub_city,
//       wereda,
//       hashedPassword,
//     ]);
//     return result.insertId;
//   } catch (error) {
//     throw new Error("FailedToRegister");
//   }
// };

// Admin.getByEmail = async (email) => {
//   const query = "SELECT * FROM admin WHERE email = ?";
//   const [rows] = await db.execute(query, [email]);
//   return rows[0];
// };
// Admin.getByEmailExcept = async (email) => {
//   const query = "SELECT * FROM admin WHERE email = ?";
//   const [rows] = await db.execute(query, [email]);
//   leng = rows.length;
//   return leng <= 1;
// };
// // SuperAdmin.getById = async (id) => {
// //   const query = "SELECT * FROM superadmin WHERE id = ?";
// //   const [rows] = await db.execute(query, [id]);
// //   return rows[0];
// // };
// Admin.getPassword = async (email) => {
//   const query = "SELECT * FROM admin WHERE email = ?";
//   const [rows] = await db.execute(query, [email]);
//   return rows[0];
// };

// Admin.getAll = async () => {
//   try {
//     const query = "SELECT * FROM admin";
//     const [rows] = await db.execute(query);
//     return rows;
//   } catch (error) {
//     throw new Error("FailedToGetAll");
//   }
// };

// Admin.getById = async (id) => {
//   const query = "SELECT * FROM admin WHERE admin_id = ?";
//   const [rows] = await db.execute(query, [id]);
//   return rows[0];
// };

// Admin.update = async (
//   id,   
//   Shemachoch_name,
//   email,
//   phone_Number,
//   city,
//   sub_city,
//   wereda,
//   password,
// ) => {
//   try {
//     const query =
//       "UPDATE admin SET Shemachoch_name = ?, email = ?, phone_Number = ?, city = ?, sub_city = ?, wereda = ?, password = ? WHERE admin_id = ?";
//     const [result] = await db.execute(query, [
//       Shemachoch_name,
//       email,
//       phone_Number,
//       city,
//       sub_city,
//       wereda,
//       password,
//       id,
//     ]);
//     return result.affectedRows > 0;
//   } catch (error) {
//     throw new Error("FailedToUpdate");
//   }
// };

// Admin.delete = async (id) => {
//   try {
//     const query = "DELETE FROM admin WHERE admin_id = ?";
//     const [result] = await db.execute(query, [id]);
//     return result.affectedRows > 0;
//   } catch (error) {
//     throw new Error("FailedToDelete");
//   }
// };

// module.exports = User;
