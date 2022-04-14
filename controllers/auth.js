const bcrypt = require("bcrypt");
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const findByNip = await User.findOne({ nip: req.body.nip });
    const findByEmail = await User.findOne({ email: req.body.email });
    if (findByNip) {
      res.status(409).json({ message: "NIP Sudah Terdaftar" });
      return;
    }
    if (findByEmail) {
      res.status(409).json({ message: "Email Sudah Terdaftar" });
      return;
    }
    const newUser = new User({ ...req.body, password: hashedPassword });
    const user = await newUser.save();
    const { password, ...others } = user._doc;
    res.status(201).json(others);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(404).json({ message: "Email atau Password salah" });
      return;
    }

    const comparedPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!comparedPassword) {
      res.status(404).json({ message: "Email atau Password salah" });
      return;
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SEC_KEY
    );

    const { password, ...others } = user._doc;
    res.status(201).json({ ...others });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
