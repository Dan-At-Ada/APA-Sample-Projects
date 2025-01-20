const { Magazine } = require('../models');

async function deleteRecords() {
  console.log('\nDeleting a magazine...');
  await Magazine.destroy({ where: { title: 'Time' } });
  const remainingMagazines = await Magazine.findAll();
  console.log('Remaining magazines:', remainingMagazines.map(m => m.title).join(', '));
}

module.exports = deleteRecords;

