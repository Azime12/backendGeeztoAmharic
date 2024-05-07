const db = require("../config/db");

const User = {};

User.register = async (full_name, email, password) => {
  try {
    const query =
      "INSERT INTO user (  full_name,email,password ) VALUES (?, ?, ?)";

    const [result] = await db.execute(query, [full_name, email, password]);
    return result;
  } catch (error) {
    console.error(
      "An error occurred while performing database operations:",
      error
    );
  }
};

User.registerGoogle = async (full_name, email) => {
  try {
    const query = "INSERT INTO user (  full_name,email ) VALUES (?, ?)";

    const [result] = await db.execute(query, [full_name, email]);
    return result.insertId;
  } catch (error) {
    console.error(
      "An error occurred while performing database operations:",
      error
    );
  }
};

User.registeruserfavorite = async (user_id, geez, amharic) => {
  try {
    const query =
      "INSERT INTO text_file (geez,amharic,user_id ) VALUES (?, ?, ?)";

    const [result] = await db.execute(query, [geez, amharic, user_id]);
    return result.insertId;
  } catch (error) {
    console.error(
      "An error occurred while performing database operations:",
      error
    );
  }
};

User.getByEmail = async (email) => {
  const query = "SELECT * FROM user WHERE email = ?";
  const [rows] = await db.execute(query, [email]);
  // console.log(rows[0]);
  return rows[0];
};
User.getByIdText = async (id) => {
  const query = "SELECT * FROM text_file WHERE id = ?";
  const [rows] = await db.execute(query, [id]);
  // console.log(rows[0]);
  return rows[0];
};

User.getPassword = async (email) => {
  const query = "SELECT * FROM user WHERE email = ?";
  const [rows] = await db.execute(query, [email]);
  return rows[0];
};

User.getById = async (id) => {
  const query = "SELECT user_id FROM user WHERE user_id = ?";
  const [rows] = await db.execute(query, [id]);
  return rows[0];
};
User.getPasswords = async (id) => {
  const query = "SELECT password FROM user WHERE user_id = ?";
  const [rows] = await db.execute(query, [id]);
  return rows[0];
};
User.passwordChange = async (id, encryptedPassword) => {
  try {
    const query = "UPDATE user SET password = ? WHERE user_id = ?";
    const [result] = await db.execute(query, [encryptedPassword, id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(
      "An error occurred while performing database operations:",
      error
    );
  }
};

User.getuserfavorite = async (user_id) => {
  const query = "SELECT * FROM text_file WHERE user_id = ?";
  const [rows] = await db.execute(query, [user_id]);
  return rows;
};

// User.getByKuponNumber = async (kupon_Number) => {
//   const query = "SELECT * FROM user WHERE kupon_Number = ?";
//   const [rows] = await db.execute(query, [kupon_Number]);
//   return rows[0];
// };
// User.getAllUser = async (admin_id) => {
//   const query = "SELECT * FROM user WHERE admin_id = ?";
//   const [rows] = await db.execute(query, [admin_id]);
//   return rows;
// };
// User.getKuponNumberExcept = async (kupon_Number) => {
//   const query = "SELECT * FROM user WHERE kupon_Number = ?";
//   const [rows] = await db.execute(query, [kupon_Number]);
//   leng = rows.length;
//   return leng <= 1;
// };
// // // SuperAdmin.getById = async (id) => {
// // //   const query = "SELECT * FROM superadmin WHERE id = ?";
// // //   const [rows] = await db.execute(query, [id]);
// // //   return rows[0];
// // // };
// // Admin.getPassword = async (email) => {
// //   const query = "SELECT * FROM admin WHERE email = ?";
// //   const [rows] = await db.execute(query, [email]);
// //   return rows[0];
// // };

// // Admin.getAll = async () => {
// //   try {
// //     const query = "SELECT * FROM admin";
// //     const [rows] = await db.execute(query);
// //     return rows;
// //   } catch (error) {
// //     throw new Error("FailedToGetAll");
// //   }
// // };

// User.getById = async (id, admin_id) => {
//   const query = "SELECT * FROM user WHERE user_id = ? AND admin_id = ? ";
//   const [rows] = await db.execute(query, [id, admin_id]);
//   return rows[0];
// };

// User.update = async (
//   id,
//   first_name,
//   middle_name,
//   last_name,
//   kupon_Number,
//   phone_Number,
//   sex,
//   city,
//   sub_city,
//   wereda,
//   admin_id
// ) => {
//   try {
//     const query =
//       "UPDATE user SET first_name = ?, middle_name = ?, last_name = ?, kupon_Number = ?, phone_Number = ?, sex = ?, city = ?, sub_city = ?, wereda = ? WHERE user_id = ? AND admin_id = ?";
//     const [result] = await db.execute(query, [
//       first_name,
//       middle_name,
//       last_name,
//       kupon_Number,
//       phone_Number,
//       sex,
//       city,
//       sub_city,
//       wereda,
//       id,
//       admin_id,
//     ]);
//     return result.affectedRows > 0;
//   } catch (error) {
//     throw new Error("FailedToUpdate");
//   }
// };

User.deleteuserfavorite = async (id, admin_id) => {
  try {
    const query = "DELETE FROM text_file WHERE id = ? AND user_id = ?";
    const [result] = await db.execute(query, [id, admin_id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(
      "An error occurred while performing database operations:",
      error
    );
  }
};
User.deleteuserfavorites = async (id) => {
  try {
    const query = "DELETE FROM text_file WHERE user_id = ?";
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(
      "An error occurred while performing database operations:",
      error
    );
  }
};
User.deleteuser = async (id) => {
  try {
    const query = "DELETE FROM user WHERE user_id = ?";
    const [result] = await db.execute(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    console.error(
      "An error occurred while performing database operations:",
      error
    );
  }
};

module.exports = User;
