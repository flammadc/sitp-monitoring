const router = require("express").Router();
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const { upload } = require("../multer.js");
const Activity = require("../models/Activity.js");
const {
  verifyTokenAndAdmin,
  verifyTokenAndAuthorization,
  verifyToken,
} = require("../middleware/verifyToken.js");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

router.get("/stats", async (req, res) => {
  const userId = req.query.id;
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await Activity.aggregate([
      {
        $match: {
          selesai: { $gte: lastYear },
          ...(userId && { id_user: userId }),
        },
      },

      { $project: { month: { $month: "$selesai" } } },

      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]).sort({ _id: 1 });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL ACTIVITIES
router.get("/", async (req, res) => {
  const userId = req.query.id;
  let activities;
  try {
    if (userId) {
      activities = await Activity.find({ id_user: userId }).sort({
        selesai: -1,
      });
    } else {
      activities = await Activity.find().sort({ selesai: -1 });
    }

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET ALL ACTIVITY USER
router.get("/:id", async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.params.id });
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);
    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// SEARCH ACTIVITY
router.get("/search/:keyword", async (req, res) => {
  const userId = req.query.userId;
  let activities;
  try {
    if (userId) {
      activities = await Activity.find({
        id_user: { $in: userId },
        $or: [
          {
            judul: { $regex: req.params.keyword, $options: "i" },
          },
          {
            jenisKegiatan: {
              $regex: req.params.keyword,
              $options: "i",
            },
          },
        ],
      });
    } else {
      activities = await Activity.find({
        $or: [
          {
            judul: { $regex: req.params.keyword, $options: "i" },
          },
          {
            jenisKegiatan: {
              $regex: req.params.keyword,
              $options: "i",
            },
          },
        ],
      });
    }

    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// POST ACTIVITY
router.post("/", upload.single("file"), async (req, res) => {
  let newActivity;
  let activity;
  try {
    if (req.file) {
      cloudinary.uploader.upload(
        req.file.path,
        { folder: "sitp/dokumen_pendukung" },
        async (error, result) => {
          if (error) res.status(500).json({ message: error });
          else
            newActivity = new Activity({
              ...req.body,
              dokumenPendukung: [
                {
                  dokumenId: result.public_id,
                  namaDokumen: req.body.name,
                  url: result.secure_url,
                },
              ],
            });
          activity = await newActivity.save();
          res.status(200).json(activity);
        }
      );
    } else {
      newActivity = new Activity(req.body);
      activity = await newActivity.save();
      res.status(200).json(activity);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPLOAD DOCUMENT
router.post("/upload", upload.single("file"), async (req, res) => {
  const activity = await Activity.findById(req.body.laporanId);
  try {
    if (activity.dokumenPendukung?.length) {
      cloudinary.uploader.destroy(
        activity.dokumenPendukung[0]?.dokumenId,
        (error, result) => {
          error && res.status(500).json(error);
        }
      );
    }
    cloudinary.uploader.upload(
      req.file.path,
      { folder: "sitp/dokumen_pendukung" },
      (error, result) => {
        if (error) res.status(500).json(error);
        else
          res
            .status(200)
            .json({ dokumenId: result.public_id, url: result.secure_url });
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE ACTIVITY
router.delete("/:id", async (req, res) => {
  try {
    const deletedActivity = await Activity.findByIdAndRemove(req.params.id);
    if (deletedActivity.dokumenPendukung?.length) {
      cloudinary.uploader.destroy(
        deletedActivity.dokumenPendukung[0].dokumenId,
        (error, result) => [error && res.status(500).json(error)]
      );
    }
    res.status(200).json(`Kegiatan ${deletedActivity.judul} Berhasil Dihapus`);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE ACTIVITY
router.put("/:id", async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(422).json("Invalid ID");
    return;
  } else
    try {
      const updatedActivity = await Activity.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(updatedActivity);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
});

module.exports = router;
