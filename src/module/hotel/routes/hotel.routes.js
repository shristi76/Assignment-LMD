const express = require("express");

const router = express.Router();

const hotelController = require("../controllers/hotel.controller");
router.get("/", hotelController.getHotels);

router.get("/:id", hotelController.getHotelDetails);

module.exports = router;