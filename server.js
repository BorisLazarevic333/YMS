const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middlewware
app.use(
  cors({
    origin: "https://yms-chi.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());

// routes
const trailerRoutes = require("./routes/trailerRoutes");
app.use("/api/trailers", trailerRoutes);

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

// konekcija na bazzu
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// start servevra
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
