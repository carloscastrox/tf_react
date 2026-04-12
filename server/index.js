// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config({
//   path: ".env",
// });

// const authRoutes = require("./routes/auth.routes");

// const app = express();
// app.use(
//   cors({
//     origin: ["https://tf-reactf.vercel.app", "http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true, // solo si usas cookies
//   }),
// );
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log("MongoDB conectado");
//   app.listen(5000, () => console.log("Servidor en puerto 5000"));
// });


import dotenv from "dotenv";
dotenv.config(); // Siempre de primero
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";

const app = express();

// 1. Middlewares
app.use(cors());
app.use(express.json());

// 2. Conexión a DB mejorada para Serverless
const connectDB = async () => {
    if (mongoose.connections[0].readyState) return;
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Mongo conectado exitosamente");
    } catch (error) {
        console.error("Error conectando a Mongo:", error);
    }
};

// Conectamos antes de definir rutas
await connectDB();

// 3. Rutas
app.get("/", (req, res) => res.send("API GastoDiario Online"));

app.use("/api/auth", authRoutes);

app.get("/test-db", async (req, res) => {
    try {
        const state = mongoose.connection.readyState;
        const states = ["desconectado", "conectado", "conectando", "desconectando"];
        res.json({ status: states[state], db: mongoose.connection.name });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. Servidor (Solo para local)
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
}

export default app;