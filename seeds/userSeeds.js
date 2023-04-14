const { User } = require("../models");

const userData = [
  {
    username: "KyleArmour",
    email: "kylejarmour@gmail.com",
    password: "password111",
  },
  {
    username: "LinhTran",
    email: "tran.linhn@gmail.com",
    password: "password222",
  },
  {
    username: "BrandonGuerrero",
    email: "brandon_g909@yahoo.com",
    password: "password333",
  },
  {
    username: "JayMasters",
    email: "jaymasters440@gmail.com",
    password: "password444",
  },
];

const userSeeds = () =>
  User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = userSeeds;
