const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category : {
        type: String,
        required: true,
    },
    image : {
        type: String,
        required: true,
    },
    author: {
      type: String,
      required: true,
    },
    language: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      required: true,
    },
    rentPerDay: {
      type: Number,
      required: true,
    },
    totalCopies: {
      type: Number,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: false,
      
    },
    catalogBy:{
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("books", bookSchema);
