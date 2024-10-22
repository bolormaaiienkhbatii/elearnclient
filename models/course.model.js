const mongoose = require("mongoose");

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    title: String,
    briefTitle: String,
    description: String,
    category: {
      type:mongoose.Schema.Types.ObjectId,
      ref: "Category"
    },
    price:Number,
    features:[
        {
            type:mongoose.Schema.Types.String
        }
    ],
    image:String,
    active:Boolean,
    buyCount:Number,
    sections: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Section"
      }
    ],
    users:[
      {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
      }
    ]
  })
);

module.exports = Course;