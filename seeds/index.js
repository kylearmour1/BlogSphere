
const sequelize = require('../config/connection');
const userData = require('./userSeeds');
const postData = require('./postSeeds');
const likeData = require('./likeSeeds');
const commentData = require('./commentSeeds');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await userData();
  await postData();
  await likeData();
  await commentData();

  process.exit(0);
};

seedDatabase();