const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");

const hotelRoutes = require("./module/hotel/routes/hotel.routes");

const app = express();

app.use(express.json());

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use("/api/v1/hotels", hotelRoutes);

module.exports = app;