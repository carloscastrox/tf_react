const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({
  path: ".env",
});

const authRoutes = require("./routes/auth.routes");

const app = express();
app.use(
  cors({
    origin: ["https://tf-reactf.vercel.app", "http://localhost:5173"],
    //methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    //allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // solo si usas cookies
  }),
);
app.use(express.json());

app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log("MongoDB conectado");
  app.listen(4000, () => console.log("Servidor en puerto 4000"));
});