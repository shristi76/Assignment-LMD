const hotelService = require("../services/hotel.service");

const getHotelDetails = async (req, res) => {

  try {

    const hotel = await hotelService.getHotelDetails(
      req.params.id
    );

    return res.status(200).json({
      success: true,
      data: hotel,
    });

  } catch (error) {

    return res.status(404).json({
      success: false,
      message: error.message,
    });

  }

};

const getHotels = async (req, res) => {
  try {
    const hotels = await hotelService.getHotels(req.query);

    return res.status(200).json({
      success: true,
      data: hotels.hotels,
      pagination: hotels.pagination,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getHotelDetails,
    getHotels,
};