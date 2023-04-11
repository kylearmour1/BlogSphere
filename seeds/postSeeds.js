
const { Post } = require('../models');

const postData = [
  {
    title: 'First Post',
    content: 'This is my first blog post.',
    user_id: 1,
  },
  {
    title: 'Second Post',
    content: 'This is my second blog post.',
    user_id: 2,
  },
];

const postSeeds = () => Post.bulkCreate(postData);

module.exports = postSeeds;