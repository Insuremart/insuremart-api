const mongoose = require("mongoose");

const ErrorSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      default: "",
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    imei: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
    data: {
      type: mongoose.Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
    toObject: {
      virtuals: true,
    },
    toJSON: {
      virtuals: true,
    },
  }
);

module.exports = mongoose.model("Error", ErrorSchema);
