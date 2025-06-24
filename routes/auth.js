const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const { User } = require('../models');

const JWT_SECRET = 'your_secret_key'; // заміни на .env змінну

router.post('/login', async (req, res) => {
  const { email, pass } = req.body;

  const user = await User.findOne({ where: { email } });
  if (!user) return res.status(401).json({ error: 'User not found' });

  const isMatch = await bcrypt.compare(pass, user.pass);
  if (!isMatch) return res.status(401).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1d' });

  res.json({ token });
});

module.exports = router;
