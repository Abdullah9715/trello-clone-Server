const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    uuId: { type: String, required: true },
    title: { type: String, required: true },
    dueDate: { type: Date },
    description: { type: String, required: true },
    category: { type: String, required: true },
    priority: { type: String, required: true },
  },

  { collection: "task", versionKey: false }
);

const User = mongoose.model("task", taskSchema);

module.exports = User;
