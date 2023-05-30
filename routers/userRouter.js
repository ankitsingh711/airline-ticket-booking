const express = require("express");
const app = express();
const UserRouter = express.Router();
const mongoose = require("mongoose");
const { UserModel } = require("../model/UserModel");

UserRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const payload = new UserModel({ name, email, password });
    await payload.save();
    res.status(201).json({
      msg: "User Registered",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: error,
      msg: "some error occured",
    });
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const payload = await UserModel.findOne({ email, password });
    if (payload) {
      res.status(201).json({
        msg: "LogIn Success",
      });
    } else {
      res.status(401).json({
        msg: "Login Failed",
      });
    }
  } catch (error) {
    res.status(400).json({
      msg: "Some error occured while login",
      error: error,
    });
  }
});

module.exports = { UserRouter };
