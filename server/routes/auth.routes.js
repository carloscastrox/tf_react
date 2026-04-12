// const express = require("express");
// const bcrypt = require("bcrypt");
// const User = require("../models/Users");

// const router = express.Router();

// // REGISTER
// router.post("/register", async (req, res) => {
//   const { fullName, email, password } = req.body;

//   if (!fullName || !email || !password) {
//     return res.status(400).json({ message: "Campos obligatorios" });
//   }

//   const exists = await User.findOne({ email });
//   if (exists) {
//     return res.status(400).json({ message: "Email ya registrado" });
//   }

//   const passwordHash = await bcrypt.hash(password, 10);

//   await User.create({ fullName, email, passwordHash });

//   res.status(201).json({ message: "Usuario creado" });
// });

// // LOGIN
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (!user) {
//     return res.status(400).json({ message: "Credenciales inválidas" });
//   }

//   const ok = await bcrypt.compare(password, user.passwordHash);
//   if (!ok) {
//     return res.status(400).json({ message: "Credenciales inválidas" });
//   }

//   res.json({
//     id: user._id,
//     fullName: user.fullName,
//     email: user.email,
//   });
// });

// module.exports = router;
// routes/auth.routes.js
import connectDB from "../config/db.js";
import express from "express";
import bcrypt from "bcrypt";
import User from "../models/Users.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    await connectDB();

    const { email, password, name } = req.body;

    //  validar campos
    if (!email || !password || !name) {
      return res.status(400).json({ msg: "Todos los campos son obligatorios" });
    }

    const normalizedEmail = email.toLowerCase();

    //  verificar si existe
    const exist = await User.findOne({ email: normalizedEmail });
    if (exist) {
      return res.status(400).json({ msg: "Usuario ya existe" });
    }

    //  hash contraseña
    const hashed = await bcrypt.hash(password, 10);

    //  crear usuario
    const user = await User.create({
      email: normalizedEmail,
      password: hashed,
      name,
    });

    //  respuesta
    res.status(201).json({
      msg: "Usuario creado",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Error del servidor" });
  }
});
// LOGIN
router.post("/login", async (req, res) => {
  await connectDB();

  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Usuario no existe" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ msg: "Contraseña incorrecta" });

  res.json({
    id: user._id,
    fullName: user.fullName,
    email: user.email,
  });
});

export default router;
