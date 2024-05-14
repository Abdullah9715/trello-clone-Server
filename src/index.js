const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/task");
const categoryRoutes = require("./routes/category");
const searchRoutes = require("./routes/search");
const profilehRoutes = require("./routes/profile");
app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/profile", profilehRoutes);
// --------------------mongoDb connect-----------------
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => {
  console.log("Mongodb error : ", error);
});
// ---------------------server-------------------
db.once("open", () => {
  console.log("Mongodb connected sucessfully!");
  const port = process.env.PORT;
  app.listen(port, () => {
    console.log(`server is running on ${port} port`);
  });
});
