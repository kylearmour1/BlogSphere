const router = require('express').Router();
const { Like } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/likes', withAuth, async (req, res) => {
  try {
    const newLike = await Like.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newLike);
  } catch (err) {
    res.status(400).json(err);
  }
});