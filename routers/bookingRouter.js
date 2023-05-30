const express = require("express");
const app = express();
const BookingRouter = express.Router();
const { BookingModel } = require("../model/BookingModel");

BookingRouter.post("/booking", async (req, res) => {
  const payload = req.body;
  try {
    const booking = new BookingModel(payload);
    await booking.save();
    res.status(201).json({
      msg: "Booking Confirmed",
    });
  } catch (error) {
    console.log(error);
  }
});

BookingRouter.get("/booking", async (req, res) => {
  try {
    const booking = await BookingModel.find();
    res.status(201).json({
      msg: "OK",
      bookings: booking,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { BookingRouter };
