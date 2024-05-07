// const User = require("../models/userModels");
const errors = require("../errorMessages/errorSuperAdmin");
// const hashPassword = require("../middlewares/passwordMiddleware");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const User = require("../models/userModels");
const salt = 10;

const authUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      success: "False",
      message: "Please Enter all the Feilds",
    });
    return;
  }

  const useremail = await User.getByEmail(email);

  if (!useremail) {
    res.status(404).json({
      success: "False",
      message: "User Does Not Exists Please Use other Email",
    });
    return;
  }
  // const result = await User.getByStatus(email);
  // // console.log(result.status);
  // if (result.status != "True") {
  //   res.status(404).json({
  //     success: "False",
  //     message: "User account is not active",
  //   });
  //   return;
  // }

  try {
    const user_info = await User.getPassword(email);
    // console.log(super_admin_info);
    const comparison = await bcrypt.compare(password, user_info.password);
    delete user_info["password"];
    if (comparison) {
      const accessToken = generateToken(email);
      res.status(200).json({ token: accessToken, user_info });
    } else {
      res
        .status(400)
        .json({ success: "False", Message: "Password Does Not Match" });
    }
  } catch (error) {
    res
      .status(400)
      .json({ success: "False", Message: "Failed to compare password" });
  }
};

const registerUser = async (req, res, next) => {
  const { full_name, email, password } = req.body;

  if (!full_name || !email || !password) {
    res.status(400).json({
      success: "False",
      message: "Please Enter all the Feilds",
    });
    return;
  }

  const useremail = await User.getByEmail(email);

  if (useremail) {
    res.status(409).json({
      success: "False",
      message: "User Already Exists Please use other Email",
    });
    return;
  } else {
    try {
      const encryptedPassword = await bcrypt.hash(password, salt);
      // console.log(encryptedPassword);
      const fulluser = await User.register(full_name, email, encryptedPassword);
      res.status(201).json({
        success: "True",
        message: "User Registerd Successfully",
      });
    } catch (error) {
      console.error("An error occurred during user registration:", error);

      return res.status(400).json({
        success: "False",
        message: "Failed To register",
      });
    }
  }
};

const addUserfavorite = async (req, res, next) => {
  if (!req.user.email) {
    res.status(401).json({
      success: "False",
      message: "No token",
    });
    return;
  }
  const current_user_email = req.user.email;

  const useridd = await User.getByEmail(current_user_email);

  if (!useridd) {
    res.status(401).json({
      success: "False",
      message: "User Id Does not exist",
    });
    return;
  }

  const current_user_id = useridd.user_id;

  const { user_id, geez, amharic } = req.body;

  if (!user_id || !geez || !amharic) {
    res.status(400).json({
      success: "False",
      message: "Please Enter all the Feilds",
    });
    return;
  }

  const userid = await User.getById(user_id);

  if (!userid) {
    res.status(409).json({
      success: "False",
      message: "User Id Does not exist",
    });
    return;
  }
  if (userid != current_user_id) {
    res.status(409).json({
      success: "False",
      message: "id doesnot much",
    });
    return;
  } else {
    try {
      const fulluser = await User.registeruserfavorite(user_id, geez, amharic);
      res.status(201).json({
        success: "True",
        message: "User favorite Registerd Successfully",
      });
    } catch (error) {
      console.error(
        "An error occurred during user favorite registration:",
        error
      );

      return res.status(400).json({
        success: "False",
        message: "Failed To register user favorite",
      });
    }
  }
};

const Userfavorite = async (req, res, next) => {
  // console.log(req.user);
  if (!req.user.email) {
    res.status(401).json({
      success: "False",
      message: "No token",
    });
    return;
  }
  const current_user_email = req.user.email;

  const userid = await User.getByEmail(current_user_email);
  if (!userid) {
    res.status(401).json({
      success: "False",
      message: "User Id Does not exist",
    });
    return;
  }

  const current_user_id = userid.user_id;

  try {
    const usertextfiles = await User.getuserfavorite(current_user_id);
    res.status(200).json(usertextfiles);
  } catch (error) {
    console.error("An error occurred during fetch user text file:", error);
    res.status(400).json({
      success: "False",
      message: "Failed To Get user info",
    });
  }
};
// const allAdmin = async (req, res, next) => {
//   try {
//     const admin = await Admin.getAll();
//     res.status(200).json(admin);
//   } catch (error) {
//     next({
//       status: errors[error.message]?.satatusCode,
//       message: errors[error.message]?.errorMessage,
//     });
//   }
// };

const deletefavorite = async (req, res, next) => {
  const { id } = req.body;

  if (!id) {
    res.status(400).json({
      success: "False",
      message: "Please Enter the text ID",
    });
    return;
  }
  const txtid = await User.getById(id);
  console.log(txtid);

  if (!txtid) {
    res.status(400).json({
      success: "False",
      message: "ID doesnot exist",
    });
    return;
  }

  if (!req.user.email) {
    res.status(401).json({
      success: "False",
      message: "No token",
    });
    return;
  }
  const current_user_email = req.user.email;

  const userid = await User.getByEmail(current_user_email);
  if (!userid) {
    res.status(401).json({
      success: "False",
      message: "User Id Does not exist",
    });
    return;
  }
  const current_user_id = userid.user_id;

  try {
    const usertextfiles = await User.deleteuserfavorite(id, current_user_id);
    res
      .status(200)
      .json({ success: "success", message: "Message deleted successfully" });
  } catch (error) {
    console.error("An error occurred during delete user text file:", error);
    res.status(400).json({
      success: "False",
      message: "Failed To delete user text file",
    });
  }
};

// const updateAdmin = async (req, res, next) => {
//   const {
//     Shemachoch_name,
//     email,
//     phone_Number,
//     city,
//     sub_city,
//     wereda,
//     password,
//   } = req.body;
//   const id = req.params.id;
//   const adminid = await Admin.getById(id);
//   const adminemail = await Admin.getByEmailExcept(email);

//   if (!adminid) {
//     next({
//       status: errors.IdDoesNotExists.satatusCode,
//       message: errors.IdDoesNotExists.errorMessage,
//     });
//   } else if (!adminemail) {
//     next({
//       status: errors.AlreadyExists.satatusCode,
//       message: errors.AlreadyExists.errorMessage,
//     });
//   } else {
//     try {
//       const encryptedPassword = await bcrypt.hash(password, salt);
//       const result = await Admin.update(
//         id,
//         Shemachoch_name,
//         email,
//         phone_Number,
//         city,
//         sub_city,
//         wereda,
//         encryptedPassword
//       );
//       res.status(200).json({ success: result });
//     } catch (error) {
//       next({
//         status: errors[error.message]?.satatusCode,
//         message: errors[error.message]?.errorMessage,
//       });
//     }
//   }
// };

module.exports = {
  registerUser,
  addUserfavorite,
  Userfavorite,
  deletefavorite,
  //   allAdmin,
  //   deleteAdmin,
  //   updateAdmin,
  // updateUser,
  authUser,
};
