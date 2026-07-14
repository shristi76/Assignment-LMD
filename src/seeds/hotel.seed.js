require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("../config/db");

const Hotel = require("../module/hotel/models/hotel.model");
const HotelImage = require("../module/hotel/models/hotelImage.model");
const Amenity = require("../module/hotel/models/amenity.model");
const HotelAmenity = require("../module/hotel/models/hotelAmenity.model");
const HotelPolicy = require("../module/hotel/models/hotelPolicy.model");
const HotelPrice = require("../module/hotel/models/hotelPrice.model");
const Review = require("../module/hotel/models/review.model");

const seed = async () => {

    await connectDB();

    console.log("Connected");

    // Clear previous data
    await Hotel.deleteMany();
    await HotelImage.deleteMany();
    await Amenity.deleteMany();
    await HotelAmenity.deleteMany();
    await HotelPolicy.deleteMany();
    await HotelPrice.deleteMany();

    // Create Hotel
    const hotel = await Hotel.create({

        name: "Meritas Picaddle Resort",

        // slug: "meritas-picaddle-resort",

        description:
            "Luxury resort located in Lonavala with swimming pool and mountain view.",

        address: "Lonavala, Pune",

        city: "Lonavala",

        state: "Maharashtra",

        country: "India",

        latitude: 18.748,

        longitude: 73.406,

        rating: 4.4,

        totalReviews: 245,

        verified: true,

    });

    console.log("Hotel Created");
    await HotelImage.insertMany([
        {
            hotelId: hotel._id,
            imageUrl:
                "https://images.unsplash.com/photo-1566073771259-6a8506099945",
            order: 1,
        },
        {
            hotelId: hotel._id,
            imageUrl:
                "https://images.unsplash.com/photo-1582719508461-905c673771fd",
            order: 2,
        },
        {
            hotelId: hotel._id,
            imageUrl:
                "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
            order: 3,
        },
    ]);

        const wifi = await Amenity.create({
        name: "Free WiFi",
        icon: "wifi.png",
    });

    const pool = await Amenity.create({
        name: "Swimming Pool",
        icon: "pool.png",
    });

    const parking = await Amenity.create({
        name: "Parking",
        icon: "parking.png",
    });

    const restaurant = await Amenity.create({
        name: "Restaurant",
        icon: "restaurant.png",
    });

        await HotelAmenity.insertMany([
        {
            hotelId: hotel._id,
            amenityId: wifi._id,
        },
        {
            hotelId: hotel._id,
            amenityId: pool._id,
        },
        {
            hotelId: hotel._id,
            amenityId: parking._id,
        },
        {
            hotelId: hotel._id,
            amenityId: restaurant._id,
        },
    ]);
        await HotelPolicy.create({

        hotelId: hotel._id,

        checkIn: "12:00 PM",

        checkOut: "11:00 AM",

        petsAllowed: false,

        smokingAllowed: false,

    });

        await HotelPrice.create({

        hotelId: hotel._id,

        actualPrice: 6000,

        offerPrice: 2499,

        tax: 499,

        currency: "INR",

    });
    await Review.insertMany([
  {
    hotelId: hotel._id,
    userName: "Rahul Sharma",
    profileImage: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    review:
      "Amazing stay. Staff was very polite and breakfast was excellent."
  },
  {
    hotelId: hotel._id,
    userName: "Priya Singh",
    profileImage: "https://i.pravatar.cc/150?img=2",
    rating: 4,
    review:
      "Rooms were clean and swimming pool was awesome."
  },
  {
    hotelId: hotel._id,
    userName: "Amit Kumar",
    profileImage: "https://i.pravatar.cc/150?img=3",
    rating: 5,
    review:
      "Perfect weekend getaway. Highly recommended."
  },
  {
    hotelId: hotel._id,
    userName: "Sneha Patel",
    profileImage: "https://i.pravatar.cc/150?img=4",
    rating: 3,
    review:
      "Food was average but location is beautiful."
  },
  {
    hotelId: hotel._id,
    userName: "Rohit Verma",
    profileImage: "https://i.pravatar.cc/150?img=5",
    rating: 4,
    review:
      "Overall nice experience with family."
  }
]);

    console.log("Seed Completed");

    process.exit();

};

seed();