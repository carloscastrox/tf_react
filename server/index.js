// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// require("dotenv").config({
//   path: ".env",
// });

// const authRoutes = require("./routes/auth.routes");

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use("/api/auth", authRoutes);

// mongoose.connect(process.env.MONGO_URI).then(() => {
//   console.log("MongoDB conectado");
//   app.listen(4000, () => console.log("Servidor en puerto 4000"));
// });


const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: ["https://tf-reactf.vercel.app", "http://localhost:5173"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // solo si usas cookies
}));

// Responder preflight
app.options("*", cors());

app.use(express.json());

// Rutas
app.post("/api/auth/login", async (req, res) => {
  return res.json({ ok: true, message: "login endpoint alive" });
});

//  Exporta el handler (esto es lo que Vercel necesita)
module.exports = app;
