const mongoose = require("mongoose");

const Section = mongoose.model(
  "Section",
  new mongoose.Schema({
    name: String,
    order: Number,
    course: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course"
        },
    videos: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Video"
        }
      ]
  })
);

module.exports = Section;