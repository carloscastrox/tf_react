const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/Users");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "Campos obligatorios" });
  }

  const exists = await User.findOne({ email });
  if (exists) {
    return res.status(400).json({ message: "Email ya registrado" });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await User.create({ fullName, email, passwordHash });

  res.status(201).json({ message: "Usuario creado" });
});

// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Credenciales inválidas" });
  }

  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) {
    return res.status(400).json({ message: "Credenciales inválidas" });
  }

  res.json({
    id: user._id,
    fullName: user.fullName,
    email: user.email,
  });
});

module.exports = router;
