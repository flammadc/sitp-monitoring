const mongoose = require("mongoose");

const activitySchema = mongoose.Schema(
  {
    id_user: String,
    judul: String,
    mulai: Date,
    selesai: Date,
    jenisKegiatan: String,
    lokasi: String,
    dokumenPendukung: [
      {
        dokumenId: { type: String },
        namaDokumen: { type: String },
        url: { type: String },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Activity", activitySchema);
