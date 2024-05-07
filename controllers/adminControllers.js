// const Admin = require("../models/adminModels");
// const User = require("../models/userModels");
// const errors = require("../errorMessages/errorSuperAdmin");
// // const hashPassword = require("../middlewares/passwordMiddleware");
// const bcrypt = require("bcrypt");
// const generateToken = require("../config/generateToken");
// const salt = 10;

// const authAdmin = async (req, res, next) => {
//   const { email, password } = req.body;

//   const adminemail = await Admin.getByEmail(email);
//   if (!adminemail) {
//     next({
//       status: errors.DoesNotExists.satatusCode,
//       message: errors.DoesNotExists.errorMessage,
//     });
//   }
//   try {
//     const adminpassword = await Admin.getPassword(email);
//     const comparison = await bcrypt.compare(password, adminpassword.password);
//     if (comparison) {
//       const accessToken = generateToken(email);
//       res.status(200).json({ token: accessToken });
//     } else {
//       res.status(200).json({ Message: "Password Does Not Match" });
//     }
//   } catch (error) {
//     res.status(400).json({ Message: "Failed to compare password" });
//   }
// };

// // const registerAdmin = async (req, res, next) => {;
// //   const {
// //     Shemachoch_name,
// //     email,
// //     phone_Number,
// //     city,
// //     sub_city,
// //     wereda,
// //     password,
// //   } = req.body;

// //   const adminemail = await Admin.getByEmail(email);

// //   if (adminemail) {
// //     next({
// //       status: errors.AlreadyExists.satatusCode,
// //       message: errors.AlreadyExists.errorMessage,
// //     });
// //   } else {
// //     try {
// //       const encryptedPassword = await bcrypt.hash(password, salt);
// //       const adminid = await Admin.register(
// //         Shemachoch_name,
// //         email,
// //         phone_Number,
// //         city,
// //         sub_city,
// //         wereda,
// //         encryptedPassword
// //       );

// //       res.status(201).json(adminid);
// //     } catch (error) {
// //       next({
// //         status: errors[error.message]?.satatusCode,
// //         message: errors[error.message]?.errorMessage,
// //       });
// //     }
// //   }
// // };

// // const allAdmin = async (req, res, next) => {

// //   try {

// //     const admin = await Admin.getAll();
// //     res.status(200).json(admin);
// //   } catch (error) {
// //     next({
// //       status: errors[error.message]?.satatusCode,
// //       message: errors[error.message]?.errorMessage,
// //     });
// //   }
// // };

// // const deleteAdmin = async (req, res, next) => {
  
// //   const id = req.params.id;
// //   const adminid = await Admin.getById(id);

// //   if (!adminid) {
// //     next({
// //       status: errors.IdDoesNotExists.satatusCode,
// //       message: errors.IdDoesNotExists.errorMessage,
// //     });
// //   } else {
// //     try {
// //       const success = await Admin.delete(id);
// //       res.status(200).json({ success: success });
// //     } catch (error) {
// //       next({
// //         status: errors[error.message]?.satatusCode,
// //         message: errors[error.message]?.errorMessage,
// //       });
// //     }
// //   }
// // };

// // const updateAdmin = async (req, res, next) => {
// //   const {
// //     Shemachoch_name,
// //     email,
// //     phone_Number,
// //     city,
// //     sub_city,
// //     wereda,
// //     password,
// //   } = req.body;
// //   const id = req.params.id;
// //   const adminid = await Admin.getById(id);
// //   const adminemail = await Admin.getByEmailExcept(email);

// //   if (!adminid) {
// //     next({
// //       status: errors.IdDoesNotExists.satatusCode,
// //       message: errors.IdDoesNotExists.errorMessage,
// //     });
// //   } else if (!adminemail) {
// //     next({
// //       status: errors.AlreadyExists.satatusCode,
// //       message: errors.AlreadyExists.errorMessage,
// //     });
// //   } else {
// //     try {
// //       const encryptedPassword = await bcrypt.hash(password, salt);
// //       const result = await Admin.update(
// //         id,
// //         Shemachoch_name,
// //         email,
// //         phone_Number,
// //         city,
// //         sub_city,
// //         wereda,
// //         encryptedPassword
// //       );
// //       res.status(200).json({ success: result });
// //     } catch (error) {
// //       next({
// //         status: errors[error.message]?.satatusCode,
// //         message: errors[error.message]?.errorMessage,
// //       });
// //     }
// //   }
// // };

// const registerUserAdmin = async (req, res, next) => {
//   const active_admin_email = req.user.email;
//   const {
//     first_name,
//     middle_name ,
//     last_name,
//     kupon_Number,
//     phone_Number,
//     sex ,
//     city,
//     sub_city,
//     wereda,
//   } = req.body;

//   const admin = await Admin.getByEmail(active_admin_email);
//   const admin_id = admin.admin_id;

//   const userKupon = await User.getByKuponNumber(kupon_Number);

//   if (userKupon) {
//     next({
//       status: errors.AlreadyExists.satatusCode,
//       message: errors.AlreadyExists.errorMessage,
//     });
//    } else {
//     try {
//       const userid = await User.register(
//         first_name,
//         middle_name,
//         last_name,
//         kupon_Number,
//         phone_Number,
//         sex,
//         city,
//         sub_city,
//         wereda,
//         admin_id
//       );

//       res.status(201).json(userid);
//     } catch (error) {
//       next({
//         status: errors[error.message]?.satatusCode,
//         message: errors[error.message]?.errorMessage,
//       });
//     }
//   }
// };
// const allUser = async (req, res, next) => {
//   try {
//     const active_admin_email = req.user.email;
//     const admin = await Admin.getByEmail(active_admin_email);
//     const admin_id = admin.admin_id;
//     const user = await User.getAllUser(admin_id);
//     res.status(200).json(user);
//   } catch (error) {
//     next({
//       status: errors[error.message]?.satatusCode,
//       message: errors[error.message]?.errorMessage,
//     });
//   }
// };
// const deleteUser = async (req, res, next) => {
//   const active_admin_email = req.user.email;
//   const admin = await Admin.getByEmail(active_admin_email);
//   const admin_id = admin.admin_id;

//   const id = req.params.id;
//   const userid = await User.getById(id, admin_id);

//   if (!userid) {
//     next({
//       status: errors.IdDoesNotExists.satatusCode,
//       message: errors.IdDoesNotExists.errorMessage,
//     });
//   } else {
//     try {
//       const success = await User.delete(id, admin_id);
//       res.status(200).json({ success: success });
//     } catch (error) {
//       next({
//         status: errors[error.message]?.satatusCode,
//         message: errors[error.message]?.errorMessage,
//       });
//     }
//   }
// };

// const updateUser = async (req, res, next) => {

//   const active_admin_email = req.user.email;
//   const admin = await Admin.getByEmail(active_admin_email);
//   const admin_id = admin.admin_id;

//   const {
//     first_name,
//     middle_name,
//     last_name,
//     kupon_Number,
//     phone_Number,
//     sex,
//     city,
//     sub_city,
//     wereda,
//   } = req.body;

//   const id = req.params.id;
//   const userid = await User.getById(id, admin_id);
//   const userKuponNumber = await User.getKuponNumberExcept(kupon_Number);


//   if (!userid) {
//     next({
//       status: errors.IdDoesNotExists.satatusCode,
//       message: errors.IdDoesNotExists.errorMessage,
//     });
//   } else if (!userKuponNumber) {
//     next({
//       status: errors.AlreadyExists.satatusCode,
//       message: errors.AlreadyExists.errorMessage,
//     });
//   } else {
//     try {
//       const result = await User.update(
//         id,
//         first_name,
//         middle_name,
//         last_name,
//         kupon_Number,
//         phone_Number,
//         sex,
//         city,
//         sub_city,
//         wereda,
//         admin_id
//       );
//       console.log(id,admin_id);
//       res.status(200).json({ success: result });
//     } catch (error) {
//       next({
//         status: errors[error.message]?.satatusCode,
//         message: errors[error.message]?.errorMessage,
//       });
//     }
//   }
// };
// module.exports = {
//   // registerAdmin,
//   // allAdmin,
//   // deleteAdmin,
//   // updateAdmin,
//   authAdmin,
//   registerUserAdmin,
//   allUser,
//   deleteUser,
//   updateUser,
// };
