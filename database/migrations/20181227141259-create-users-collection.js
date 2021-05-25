const genHash = require('../gen-hash');

module.exports = {
  async up(db, next) {
    try {
      await db.createCollection('users')
        .then((collection) => collection.insertOne({
          login: 'admin',
          fullName: 'Адміністратор',
          isAdmin: true,
          created: Date.now(),
          password: genHash('alfa$10')
        })
      );

      next();
    } catch (e) {
      // user already exists
      next();
    }
  }
};
