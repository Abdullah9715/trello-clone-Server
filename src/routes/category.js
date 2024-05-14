const express = require("express");
const router = express.Router();
const Category = require("../models/category ");

// add Category
router.post("/addCategory", async (req, res) => {
  const categoryData = new Category({
    uuId: req.body.uuId,
    name: req.body.name,
  });

  try {
    const category = await categoryData.save();
    res.status(201).json({ message: "category Added successfuly!", category });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Category for current user
router.get("/getCategory", async (req, res) => {
  try {
    const { uuId } = req.body;

    if (!uuId) {
      return res.status(400).json({ error: "UUID is required" });
    }

    const taskData = await Category.find({ uuId });
    console.log("🚀 ~ router.get ~ taskData:", taskData);

    res.json(taskData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get Category by Id
router.get("/getCategory/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Category.findOne({ _id: id })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "Category  not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
      });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// delete Category
router.delete("/deleteCategory/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await Category.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Category  not found" });
    }
    res.status(200).json({ message: "Category  deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update Category
router.put("/updateCategory/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json("id not found");
  }

  try {
    const taskData = req.body;
    const updatedTask = await Category.findOneAndUpdate({ _id: id }, taskData, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
