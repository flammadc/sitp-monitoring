const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

const { upload } = require("../multer.js");
const {
  getAllUsers,
  updateUser,
  uploadPic,
  deleteUser,
  getUser,
  searchUser,
} = require("../controllers/user.js");

const router = require("express").Router();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

// GET ALL USER
router.get("/", getAllUsers);

// UPDATE USER
router.put("/:id", updateUser);

// UPLOAD PROFILE PIC
router.post("/upload", upload.single("file"), uploadPic);

// DELETE USER
router.delete("/:id", deleteUser);

// GET SEARCHED USER
router.get("/search/:keyword", searchUser);

// GET USER
router.get("/:id", getUser);

module.exports = router;
