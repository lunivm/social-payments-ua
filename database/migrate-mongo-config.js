const nconf = require('nconf');

// Setup nconf to use (in-order):
//   1. Command-line arguments
//   2. Environment variables
//   3. A file located at 'path/to/config.json'
nconf
  .argv()
  .env()
  .file({file: '../back-end/config/server.json'});

const mongodbUri = nconf.get('MONGODB_URI');

const uriParts = mongodbUri.split('/');
const dbName = uriParts[uriParts.length - 1];

// In this file you can configure migrate-mongo
module.exports = {
  mongodb: {
    url: mongodbUri,

    databaseName: dbName,

    options: {
      useNewUrlParser: true // removes a deprecation warning when connecting
      //   connectTimeoutMS: 3600000, // increase connection timeout to 1 hour
      //   socketTimeoutMS: 3600000, // increase socket timeout to 1 hour
    }
  },

  // The migrations dir, can be an relative or absolute path. Only edit this when really necessary.
  migrationsDir: "migrations",

  // The mongodb collection where the applied changes are stored. Only edit this when really necessary.
  changelogCollectionName: "changelog"
};
