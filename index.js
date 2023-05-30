const express = require("express");
const app = express();
require("dotenv").config();
const { connection } = require("./config/db");
const { UserRouter } = require("./routers/userRouter");
const { FlightRouter } = require("./routers/flightRouter");
const { BookingRouter } = require("./routers/bookingRouter");

app.use(express.json());
app.use("/api", UserRouter);
app.use("/api", FlightRouter);
app.use("/api", BookingRouter);

let port = process.env.PORT;

app.listen(port, async () => {
  try {
    await connection;
    console.log("DB Connected");
    console.log(`App is running on ${port}`);
  } catch (error) {
    console.log(error);
  }
});
