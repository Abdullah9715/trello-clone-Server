const express = require("express");
const router = express.Router();
const User = require("../models/user.js");

// update Profile
router.put("/updateProfile/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json("id not found");
  }

  try {
    const userData = req.body;
    const updatedUser = await User.findOneAndUpdate({ _id: id }, userData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/getUser", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
