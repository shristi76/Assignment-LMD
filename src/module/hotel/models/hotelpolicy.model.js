const mongoose = require("mongoose");

const hotelPolicySchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
      unique: true,
    },

    checkIn: {
      type: String,
      default: "12:00 PM",
    },

    checkOut: {
      type: String,
      default: "11:00 AM",
    },

    petsAllowed: {
      type: Boolean,
      default: false,
    },

    smokingAllowed: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HotelPolicy", hotelPolicySchema);