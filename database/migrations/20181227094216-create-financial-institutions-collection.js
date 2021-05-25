const fiList = require('../data-sources/banks/bank-list');

module.exports = {
  up(db) {
    return db.createCollection('financialInstitutions')
      .then((collection) => collection.insertMany(fiList));
  }
};
