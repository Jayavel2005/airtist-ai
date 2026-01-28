import mongoose from "mongoose";

const generatedImageSchema = new mongoose.Schema(
  {
    prompt: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      default: "sdxl",
    },

    creditsUsed: {
      type: Number,
      default: 1,
    },

    status: {
      type: String,
      enum: ["success", "failed"],
      default: "success",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);


const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      select: false,
    },

    credits: {
      type: Number,
      default: 5,
      min: 0,     
    },

    images: {
      type: [generatedImageSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
