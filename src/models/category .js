const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    uuId: { type: String, required: true },
    name: { type: String, required: true },
  },

  { collection: "category", versionKey: false }
);

const Task = mongoose.model("category", categorySchema);

module.exports = Task;
