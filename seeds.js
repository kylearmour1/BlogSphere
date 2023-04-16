const sequelize = require('./config/connection');
const userSeeds = require('./seeds/userSeeds');

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('\n----- DATABASE SYNCED -----\n');
    
    await userSeeds();
    console.log('\n----- USERS SEEDED -----\n');
    
    process.exit(0);
  } catch (error) {
    console.error('ERROR - Unable to seed database:', error);
    process.exit(1);
  }
};

seedAll();
