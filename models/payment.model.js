const mongoose = require("mongoose");

const Payment = mongoose.model(
  "Payment",
  new mongoose.Schema({
    date: mongoose.Schema.Types.Date,
    status:String,
    course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
  })
);

module.exports = Payment;