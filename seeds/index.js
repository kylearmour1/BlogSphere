
const sequelize = require('../config/connection');
const userData = require('./userSeeds');
const postData = require('./postSeeds');
const likeData = require('./likeSeeds');
const commentData = require('./commentSeeds');

const User = require('../models/User');
const Post = require('../models/Post');
const Like = require('../models/Like');
const Comment = require('../models/Comment');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData);
  await Like.bulkCreate(likeData);
  await Comment.bulkCreate(commentData);

  process.exit(0);
};

seedDatabase();
