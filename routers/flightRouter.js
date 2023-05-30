const express = require("express");
const app = express();
const FlightRouter = express.Router();
const { FlightModel } = require("../model/FlightModel");

FlightRouter.get("/flights", async (req, res) => {
  try {
    const flights = await FlightModel.find();
    res.status(200).json({
      status: "OK",
      flights: flights,
    });
  } catch (error) {
    console.log(error);
  }
});

FlightRouter.post("/flights", async (req, res) => {
  const {
    airline,
    flightNo,
    departure,
    arrival,
    departureTime,
    arrivalTime,
    seats,
    price,
  } = req.body;
  try {
    const flights = new FlightModel({
      airline,
      flightNo,
      departure,
      arrival,
      departureTime,
      arrivalTime,
      seats,
      price,
    });
    await flights.save();
    res.status(201).json({
      msg: "flights added",
    });
  } catch (error) {
    console.log(error);
  }
});

FlightRouter.get("/flights/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const flight = await FlightModel.findById({ _id: id });
    res.status(200).json({
      msg: "OK",
      flight: flight,
    });
  } catch (error) {
    console.log(error);
  }
});

FlightRouter.delete("/flights/:id", async (req, res) => {
  const flightId = req.params.id;
  try {
    await FlightModel.findByIdAndDelete({ _id: flightId });
    res.status(202).json({
      msg: "Flight Deleted",
    });
  } catch (error) {
    console.log(error);
  }
});

FlightRouter.patch("/flights/:id", async (req, res) => {
  const updatedFields = req.body;
  const flightId = req.params.id;
  try {
    const flight = await FlightModel.findOneAndUpdate(
      { _id: flightId },
      { $set: updatedFields },
      { new: true }
    );
    res.status(204).json({
      msg: "Flight Updated",
      flight: flight,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = { FlightRouter };
