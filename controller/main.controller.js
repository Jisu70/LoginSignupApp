const User = require("../schema/user.schema");
const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");

const path = require("path");

// Signup page
const mainRoute = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../views/signup.html"));
  } catch (error) {
    res.status(500).json({
      error: "There was a problem on the server side",
    });
  }
};

// Exixst user
const existinguser = async (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "../views/login.html"));
  } catch (error) {
    res.status(500).json({
      error: "There was a problem on the server side",
    });
  }
};
// Save the signup data to database
const saveData = async (req, res) => {
  try {
    //  To hash  the password we used bcrypt
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashPassword,
    });
    await newUser.save();
    res.status(200).json({
      message: "Signup  was Successfully!",
    });
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      res.status(400).json({
        message: "Username already exists.",
      });
    } else {
      res.status(500).json({
        message: "An unexpected error occurred.",
      });
    }
  }
};
// To check the user data was present in databse
const loginUser = async (req, res) => {
  try {
    // This will search the user using username
    const user = await User.find({
      username: req.body.username,
    });
    console.log(user);
    if (user && user.length > 0) {
      // This will compare the password thats come with body
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user[0].password
      );
      if (isValidPassword) {
        res.status(200).json({
          message: "Signup  was Successfully!",
        });
      }
    } else {
      res.status(401).json({
        error: "Authentication was failed !!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({
      error: "Authentication was failed !!!",
    });
  }
};

module.exports = {
  mainRoute,
  saveData,
  loginUser,
  existinguser,
};
