const express = require("express");
const router = express.Router();
const Task = require("../models/task");
const User = require("../models/user");

// add Task
router.post("/addTask", async (req, res) => {
  const user = await User.findById({
    _id: req.body.uuId,
  });

  if (!user) {
    return res.status(400).json({ message: "User Not exists" });
  }
  const taskData = new Task({
    uuId: req.body.uuId,
    title: req.body.title,
    description: req.body.description,
    category: req.body.category,
    priority: req.body.priority,
  });

  try {
    const task = await taskData.save();
    res.status(201).json({ message: "Task Added successfuly!", task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Tasks for current user
router.get("/getTasks", async (req, res) => {
  try {
    const { uuId } = req.body;
    console.log("🚀 ~ router.get ~ uuId:", uuId);
    if (!uuId) {
      return res.status(400).json({ error: "UUID is required" });
    }

    const taskData = await Task.find({ uuId });
    console.log("🚀 ~ router.get ~ taskData:", taskData);

    res.json(taskData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get task by Id
router.get("/getTask/:id", async (req, res) => {
  try {
    const id = req.params.id;
    Task.findOne({ _id: id })
      .then((user) => {
        if (user) {
          res.json(user);
        } else {
          res.status(404).json({ message: "Task not found" });
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

// delete task
router.delete("/deleteTask/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await Task.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update Task
router.put("/updateTask/:id", async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(404).json("id not found");
  }

  try {
    const taskData = req.body;
    const updatedTask = await Task.findOneAndUpdate({ _id: id }, taskData, {
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
