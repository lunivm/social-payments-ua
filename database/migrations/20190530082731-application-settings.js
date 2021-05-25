module.exports = {
  up(db) {
    return db.createCollection('applicationSettings')
      .then((collection) => collection.insertMany([
        {
          param: 'territoryCode',
          data: '0952'
        },
        {
          param: 'edrpou',
          data: '36733431'
        },
        {
          param: 'dbVersion',
          data: '0.0.0'
        }
      ]));
  }
};
