const streetsList = require('../data-sources/streets/streets');

module.exports = {
  up(db) {
    return db.createCollection('streets')
      .then((collection) => collection.insertMany(streetsList));
  }
};
