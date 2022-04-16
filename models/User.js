const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nama: String,
    jabatan: String,
    noTelp: String,
    isAdmin: { type: Boolean, default: false },
    nip: { type: String, unique: true },
    email: { type: String, unique: true },
    password: { type: String, required: true },
    profilePic: [
      {
        picId: { type: String },
        url: { type: String },
      },
    ],
    pendidikanTerakhir: [
      {
        jurusan: String,
        kampus: String,
        negara: String,
        tahun: String,
      },
    ],
    pengalaman: [{ jabatan: String, tempat: String, masaKerja: String }],
  },
  { timestamps: true }
);
module.exports = mongoose.model("User", UserSchema);
