const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(422).json("Invalid Id");
  } else {
    try {
      let updatedHashedPass;
      const user = await User.findById(req.params.id);
      !user && res.status(404).json("Account Not Found");
      if (req.body.password) {
        const genSalt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, genSalt);
      }
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: { ...req.body },
        },
        { new: true }
      );

      const { password, ...others } = updatedUser._doc;
      res.status(200).json(others);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

const uploadPic = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    if (user.profilePic.length) {
      cloudinary.uploader.destroy(user.profilePic[0].picId, (error, result) => {
        if (error) res.status(500).json({ message: error });
      });
    }
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "sitp/profile_pic" },
      (error, result) => {
        if (error) res.status(500).json({ message: error });
        else
          res.status(200).json({
            picId: result.public_id,
            url: result.secure_url,
          });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    try {
      const deletedUser = await User.findByIdAndRemove(req.params.id);
      if (deletedUser.profilePic?.length) {
        cloudinary.uploader.destroy(
          deletedUser.profilePic[0].picId,
          (error, result) => [error && res.status(500).json(error)]
        );
      }
      res.status(200).json(`User ${deletedUser.nama} Berhasil Dihapus`);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    res.status(422).json("Invalid Id");
  }
};

const searchUser = async (req, res) => {
  try {
    const users = await User.find({
      nama: { $regex: req.params.keyword, $options: "i" },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  updateUser,
  uploadPic,
  deleteUser,
  searchUser,
  getUser,
};
