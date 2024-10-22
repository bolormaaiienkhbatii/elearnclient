const mongoose = require("mongoose");

const Category = mongoose.model(
  "Category",
  new mongoose.Schema({
    name: String,
    status:String,
    courses: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course"
        }
      ]
  })
);

module.exports = Category;