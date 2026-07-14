const mongoose = require("mongoose");

const hotelPriceSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      unique: true,
    },

    actualPrice: {
      type: Number,
      required: true,
    },

    offerPrice: {
      type: Number,
      required: true,
    },

    tax: {
      type: Number,
      default: 0,
    },

    currency: {
      type: String,
      default: "INR",
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HotelPrice", hotelPriceSchema);