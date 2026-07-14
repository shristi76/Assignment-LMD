const repository = require("../repository/hotel.repository");

/**
 * Get Single Hotel Details
 */
const getHotelDetails = async (hotelId) => {

    const hotel = await repository.findHotelById(hotelId);

    if (!hotel) {
        throw new Error("Hotel not found");
    }

    const [
        images,
        amenities,
        policy,
        price,
        reviews,
    ] = await Promise.all([
        repository.findHotelImages(hotelId),
        repository.findHotelAmenities(hotelId),
        repository.findHotelPolicy(hotelId),
        repository.findHotelPrice(hotelId),
        repository.findReviews(hotelId),
    ]);

    return {
        hotel,
        images,
        amenities,
        policy,
        price,
        reviews,
    };
};

/**
 * Hotel Listing
 */
const getHotels = async (query) => {

    const page = Number(query.page) || 1;

    const limit = Number(query.limit) || 10;

    const data = await repository.getHotels({
        page,
        limit,
        search: query.search,
        city: query.city,
        rating: query.rating,
        minPrice: query.minPrice,
        maxPrice: query.maxPrice,
    });

    return {
        hotels: data.hotels,
        pagination: {
            page,
            limit,
            total: data.total,
            totalPages: Math.ceil(data.total / limit),
        },
    };
};

module.exports = {
    getHotelDetails,
    getHotels,
};