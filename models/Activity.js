const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    id_user: String,
    judul: String,
    mulai: Date,
    selesai: Date,
    jenisKegiatan: String,
    lokasi: String,
    undangan: [
      {
        dokumenId: { type: String },
        namaDokumen: { type: String },
        url: { type: String },
      },
    ],
    suratTugas: [
      {
        dokumenId: { type: String },
        namaDokumen: { type: String },
        url: { type: String },
      },
    ],
    daftarHadir: [
      {
        dokumenId: { type: String },
        namaDokumen: { type: String },
        url: { type: String },
      },
    ],
    dokumentasi: [
      {
        dokumenId: { type: String },
        namaDokumen: { type: String },
        url: { type: String },
      },
    ],
    dokumenLainnya: [
      {
        dokumenId: { type: String },
        namaDokumen: { type: String },
        url: { type: String },
      },
    ],
    internal: [
      {
        jumlah: { type: Number },
        kelompok: [String],
      },
    ],
    eksternal: [
      {
        jumlah: { type: Number },
        nama: String,
      },
    ],
    link: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
