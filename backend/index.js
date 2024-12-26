const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const dpsRoute = require("./routes/dps.routes.js");
const risetRoute = require("./routes/riset.routes.js");
const buletinRoute = require("./routes/buletin.routes.js");
const regulasiRoute = require("./routes/regulasi.routes.js");
const lrsaRoute = require("./routes/lrsa.routes.js");
const userRoute = require("./routes/user.routes.js");
const authRoutes = require("./routes/auth.routes.js");

const app = express();
const PORT = 3000;
const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

//midleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Konfigurasi CORS
app.use(cors());
app.use(cors({ origin: "http://localhost:5173", methods: ["GET", "POST"] }));
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//routes
app.use("/api/dps", dpsRoute);
app.use("/api/riset", risetRoute);
app.use("/api/buletin", buletinRoute);
app.use("/api/regulasi", regulasiRoute);
app.use("/api/auth", authRoutes);
app.use("/api/lrsa", lrsaRoute);
app.use("/api/user", userRoute);

//app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Welcome to Syariah Information System");
});

app.listen(port, () => {
  console.log(`SIS Running on Port ${HOST}:${PORT}`);
});

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/your_database_name"
);
const db = mongoose.connection;
db.on("error", (err) => console.log(err));
db.once("open", () => console.log("Connected to MongoDB"));
