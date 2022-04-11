const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) console.log(err);
    else console.log("Database Connected");
  }
);

const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static(path.join(__dirname, "/images")));

const PORT = process.env.PORT || 5000;

const authRoute = require("./routes/auth.js");
const activityRoute = require("./routes/activity.js");
const userRoute = require("./routes/user.js");

app.use("/api/auth", authRoute);
app.use("/api/activities", activityRoute);
app.use("/api/users", userRoute);

app.use(express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
