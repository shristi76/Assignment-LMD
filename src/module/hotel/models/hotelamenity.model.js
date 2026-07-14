const mongoose = require("mongoose");

const hotelAmenitySchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    amenityId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Amenity",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("HotelAmenity", hotelAmenitySchema);