const { Like } = require('../models');

const likeData = [
  {
    user_id: 1,
    post_id: 2,
  },
  {
    user_id: 2,
    post_id: 1,
  },
];

const likeSeeds = () => Like.bulkCreate(likeData);

module.exports = likeSeeds;


module.exports = likeSeeds;