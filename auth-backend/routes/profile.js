const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/auth');

const router = express.Router();

router.get('/me', authMiddleware, async (req, res) => {
  const user = await User.findById(req.user.id)
    .select('-passwordHash');

  res.json(user);
});

module.exports = router;