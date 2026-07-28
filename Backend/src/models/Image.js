const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    originalImage: {
      type: String,
      required: true,
    },

    processedImage: {
      type: String,
      default: "",
    },

    originalSize: {
      type: Number,
      required: true,
    },

    processedSize: {
      type: Number,
      default: 0,
    },

    compressionRatio: {
      type: Number,
      default: 0,
    },

    processingTime: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["pending", "processing", "completed", "failed"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Image", imageSchema);