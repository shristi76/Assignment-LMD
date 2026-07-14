const Hotel = require("../models/hotel.model");
const HotelImage = require("../models/hotelImage.model");
const HotelAmenity = require("../models/hotelAmenity.model");
const Amenity = require("../models/amenity.model");
const HotelPolicy = require("../models/hotelPolicy.model");
const HotelPrice = require("../models/hotelPrice.model");
// const Review = require("../models/review.model");

/**
 * Get hotel basic information
 */
const findHotelById = async (hotelId) => {
  return await Hotel.findById(hotelId);
};

/**
 * Get hotel images
 */
const findHotelImages = async (hotelId) => {
  return await HotelImage.find({ hotelId }).sort({ order: 1 });
};

/**
 * Get hotel policy
 */
const findHotelPolicy = async (hotelId) => {
  return await HotelPolicy.findOne({ hotelId });
};

/**
 * Get hotel price
 */
const findHotelPrice = async (hotelId) => {
  return await HotelPrice.findOne({ hotelId });
};

/**
 * Get hotel amenities
 */
const findHotelAmenities = async (hotelId) => {

  const hotelAmenities = await HotelAmenity
    .find({ hotelId })
    .populate("amenityId");

  return hotelAmenities.map(item => item.amenityId);
};
const findReviews = async (hotelId) => {

    return await Review.find({ hotelId })
        .sort({ createdAt: -1 });

};

const getHotels = async ({
  page,
  limit,
  search,
  city,
  rating,
  minPrice,
  maxPrice,
}) => {
  const filter = {
    status: "ACTIVE",
  };

  if (search) {
    filter.name = {
      $regex: search,
      $options: "i",
    };
  }

  if (city) {
    filter.city = city;
  }

  if (rating) {
    filter.rating = {
      $gte: Number(rating),
    };
  }

  const skip = (page - 1) * limit;

  const hotels = await Hotel.find(filter)
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Hotel.countDocuments(filter);

  const result = [];

  for (const hotel of hotels) {
    const image = await HotelImage.findOne({
      hotelId: hotel._id,
    });

    const price = await HotelPrice.findOne({
      hotelId: hotel._id,
    });

    if (minPrice && price.offerPrice < Number(minPrice))
      continue;

    if (maxPrice && price.offerPrice > Number(maxPrice))
      continue;

    result.push({
      id: hotel._id,
      name: hotel.name,
      city: hotel.city,
      rating: hotel.rating,
      verified: hotel.verified,
      image: image ? image.imageUrl : null,
      price: price
        ? {
            actualPrice: price.actualPrice,
            offerPrice: price.offerPrice,
          }
        : null,
    });
  }

  return {
    hotels: result,
    total,
  };
};

module.exports = {
  findHotelById,
  findHotelImages,
  findHotelPolicy,
  findHotelPrice,
  findHotelAmenities,
  findReviews,
    getHotels,
};