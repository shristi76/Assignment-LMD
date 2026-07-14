const mongoose = require("mongoose");

const hotelSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    propertyType: {
      type: String,
      enum: ["HOTEL", "RESORT", "VILLA", "APARTMENT"],
      default: "HOTEL",
    },

    address: String,

    city: String,

    state: String,

    country: String,

    latitude: Number,

    longitude: Number,

    rating: {
      type: Number,
      default: 0,
    },

    totalReviews: {
      type: Number,
      default: 0,
    },

    verified: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hotel", hotelSchema);