const router = require("express").Router();

const { upload } = require("../multer.js");
const {
  getStats,
  getAllActivities,
  getAllUserActivity,
  getActivity,
  getSearchedActivity,
  postActivity,
  uploadDocument,
  deleteActivity,
  updateActivity,
} = require("../controllers/activity.js");

router.get("/stats", getStats);

// GET ALL ACTIVITIES
router.get("/", getAllActivities);

// GET ALL ACTIVITY USER
router.get("/:id", getAllUserActivity);

// GET ACTIVITY
router.get("/detail/:id", getActivity);

// SEARCH ACTIVITY
router.get("/search/:keyword", getSearchedActivity);

// POST ACTIVITY
router.post("/", upload.single("file"), postActivity);

// UPLOAD DOCUMENT
router.post("/upload", upload.single("file"), uploadDocument);

// DELETE ACTIVITY
router.delete("/:id", deleteActivity);

// UPDATE ACTIVITY
router.put("/:id", updateActivity);

module.exports = router;
