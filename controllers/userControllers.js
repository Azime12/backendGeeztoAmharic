// const User = require("../models/userModels");
const errors = require("../errorMessages/errorSuperAdmin");
// const hashPassword = require("../middlewares/passwordMiddleware");
const bcrypt = require("bcrypt");
const generateToken = require("../config/generateToken");
const User = require("../models/userModels");
const Tesseract = require("tesseract.js");
const salt = 10;
const path = require("path");

function processText(text) {
  // Split the text into sentences based on the "።" character
  const sentences = text.split("።");

  // Remove "፤" and "፡" between words in each sentence
  const processedSentences = sentences
    .map((sentence) => {
      // Replace "፤" and "፡" with spaces
      let processedSentence = sentence.replace(/፤|፡|፥|፣|‹|\*/g, " ");
      // Remove extra spaces between words
      processedSentence = processedSentence.replace(/\s+/g, " ").trim();
      return processedSentence;
    })
    .filter(Boolean);

  return processedSentences;
}

const authUserMobile = async (req, res, next) => {
  console.log(req.body.user.email);
  const full_name = req.body.user.name;
  const email = req.body.user.email;
  const pic = req.body.user.photo;

  // console.log(req.user);

  if (!email || !full_name) {
    res.status(500).json({
      success: "False",
      message: "Internal server error",
    });
    return;
  }
  const useremail = await User.getByEmail(email);
  // console.log(useremail);

  if (useremail) {
    const accessToken = generateToken(email);
    // delete useremail["password"];
    res.status(200).json({ token: accessToken, useremail, pic });
    return;
  } else {
    try {
      const fulluser = await User.registerGoogle(full_name, email);
      const accessToken = generateToken(email);
      const userinfo = await User.getByEmail(email);
      // delete userinfo["password"];
      res.status(200).json({ token: accessToken, userinfo, pic });
    } catch (error) {
      console.error("An error occurred during user registration:", error);

      return res.status(400).json({
        success: "False",
        message: "Failed To register",
      });
    }
  }
};

const authGoogleUser = async (req, res, next) => {
  const full_name = req.user._json.name;
  const email = req.user._json.email;
  const pic = req.user._json.picture;

  // console.log(req.user);

  if (!email || !full_name) {
    res.status(500).json({
      success: "False",
      message: "Internal server error",
    });
    return;
  }
  const useremail = await User.getByEmail(email);
  console.log(useremail);

  if (useremail) {
    const accessToken = generateToken(email);
    // delete useremail["password"];
    res.status(200).json({ token: accessToken, useremail, pic });
    return;
  } else {
    try {
      const fulluser = await User.registerGoogle(full_name, email);
      const accessToken = generateToken(email);
      const userinfo = await User.getByEmail(email);
      // delete userinfo["password"];
      res.status(200).json({ token: accessToken, userinfo, pic });
    } catch (error) {
      console.error("An error occurred during user registration:", error);

      return res.status(400).json({
        success: "False",
        message: "Failed To register",
      });
    }
  }
};

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
    // delete user_info["password"];
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
      const userinfo = await User.getByEmail(email);
      // delete userinfo["password"];
      // console.log(useremail);
      const accessToken = generateToken(email);
      // res.status(200).json({ token: accessToken, user_info });
      res.status(201).json({
        success: "True",
        message: "User Registerd Successfully",
        token:accessToken,
        userinfo,
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
};

const Userfavorite = async (req, res, next) => {
  const user_id = req.params.userId;
  console.log("asdf");
  const userid = await User.getById(user_id);
  if (!userid) {
    res.status(401).json({
      success: "False",
      message: "User Id Does not exist",
    });
    return;
  }

  try {
    const usertextfiles = await User.getuserfavorite(userid.user_id);
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

const ocrmodel = async (req, res, next) => {
  if (!req.files || !req.files.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  const file = req.files.file;

  // Save the uploaded file
  const filename = file.name;
  const filePath = path.join(__dirname, "../uploads", filename);

  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Failed to upload file" });
    }

    // Extract text from the uploaded image
    Tesseract.recognize(filePath, "amh", { logger: (m) => console.log(m) })
      .then(({ data: { text } }) => {
        // Process the extracted text
        const processedText = processText(text);
        // Send the processed text as JSON response
        res.json({ processed_text: processedText });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: "Failed to process image" });
      });
  });
};

const deleteUser = async (req, res, next) => {
  const id = req.params.id;
  // const { user_id, text_id } = req.body;

  if (!id) {
    res.status(400).json({
      success: "False",
      message: "Please Enter the text ID",
    });
    return;
  }
  const adminid = await User.getById(id);
  if (!adminid) {
    res.status(400).json({
      success: "False",
      message: "ID doesnot exist",
    });
    return;
  }
  console.log(adminid);
  try {
    const updatetextid = await User.deleteuserfavorites(adminid.user_id);
    const usertextfiles = await User.deleteuser(adminid.user_id);
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

const deletefavorite = async (req, res, next) => {
  const { user_id, text_id } = req.body;

  if (!user_id || !text_id) {
    res.status(400).json({
      success: "False",
      message: "Please Enter the text ID",
    });
    return;
  }
  const txtid = await User.getByIdText(text_id);
  if (!txtid) {
    res.status(400).json({
      success: "False",
      message: "ID doesnot exist",
    });
    return;
  }
  try {
    const usertextfiles = await User.deleteuserfavorite(text_id, user_id);
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

const changePasswordUser = async (req, res, next) => {
  const { id, oldpassword, newpassword } = req.body;
  // console.log(req.body);

  if (!id || !oldpassword || !newpassword) {
    res.status(400).json({
      success: "False",
      message: "Please Enter user id",
    });
    return;
  }
  const userid = await User.getById(id);

  // console.log(userid);

  if (!userid) {
    res.status(404).json({
      success: "False",
      message: "Id Does Not Exists",
    });
    return;
  }

  const User_passowrd = await User.getPasswords(id);

  // console.log(User_passowrd);
  if (!User_passowrd) {
    res.status(404).json({
      success: "False",
      message: "User have no password",
    });
    return;
  }

  const comparison = await bcrypt.compare(oldpassword, User_passowrd.password);
  // console.log(comparison);
  if (!comparison) {
    res.status(400).json({
      success: "False",
      message: "Password Does Not Match",
    });
    return;
  }

  try {
    const encryptedPassword = await bcrypt.hash(newpassword, salt);
    const result = await User.passwordChange(id, encryptedPassword);

    res.status(200).json({
      success: result,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("An error occurred during reset password:", error);
    res.status(400).json({
      success: "False",
      message: "Failed To change password",
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
  changePasswordUser,
  //   allAdmin,
  //   deleteAdmin,
  //   updateAdmin,
  // updateUser,
  authUser,
  authGoogleUser,
  authUserMobile,
  deleteUser,
  ocrmodel,
};
