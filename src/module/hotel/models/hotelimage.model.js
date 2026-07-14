const mongoose = require("mongoose");

const hotelImageSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    order: {
      type: Number,
      default: 1,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HotelImage", hotelImageSchema);