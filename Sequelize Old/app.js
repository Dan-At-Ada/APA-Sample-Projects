const { sequelize } = require('./models');
const createRecords = require('./operations/createRecords');
const readRecords = require('./operations/readRecords');
const updateRecords = require('./operations/updateRecords');
const deleteRecords = require('./operations/deleteRecords');
const advancedQueries = require('./operations/advancedQueries');

async function runDemo() {
  try {
    // Sync models with database
    await sequelize.sync({ force: true });
    console.log('Database synced. Models created.');

    await createRecords();
    await readRecords();
    await updateRecords();
    await deleteRecords();
    await advancedQueries();

  } catch (error) {
    console.error('Error occurred:', error);
  } finally {
    await sequelize.close();
    console.log('\nDatabase connection closed.');
  }
}

runDemo();

