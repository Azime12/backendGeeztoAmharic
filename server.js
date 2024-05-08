const express = require("express");
require("dotenv").config();
// const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const frontend = require("./routes/frontend");
const passport = require("passport");
const session = require("express-session");
// const fs = require("fs");
const fileUpload = require("express-fileupload");

const app = express();
const PORT = process.env.PORT || 5500;
const cors = require("cors");

app.use(fileUpload());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
// const corsOptions = {
//   origin: "https://example.com", // Replace with your desired domain
// };

app.use(cors());
app.use(express.json()); // to accept json data

// app.use("/api/admins", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/http://localhost:5173", frontend);

// app.get('/',(req,res) => {
//     res.send("App is Working");
// })
app.use(errorMiddleware);
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
