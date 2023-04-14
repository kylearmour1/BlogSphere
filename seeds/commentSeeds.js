const { Comment } = require("../models");

const commentData = [
  {
    content: "Great post!",
    user_id: 2,
    post_id: 1,
  },
  {
    content: "Thanks for sharing!",
    user_id: 1,
    post_id: 2,
  },
];

const commentSeeds = () => Comment.bulkCreate(commentData);

module.exports = commentSeeds;
