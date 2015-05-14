var mongoAdapter = require('sails-mongo');

// Build A Config Object
module.exports = {

  // Setup Adapters
  // Creates named adapters that have have been required
  adapters: {
    'default': mongoAdapter,
    'sails-mongo': mongoAdapter
    // disk: diskAdapter,
    // mysql: mysqlAdapter
  },

  // Build Connections Config
  // Setup connections using the named adapter configs
  connections: {
    // myLocalDisk: {
    //   adapter: 'disk'
    // },

    // myLocalMySql: {
    //   adapter: 'mysql',
    //   host: 'localhost',
    //   database: 'foobar'
    // },
    devMongodb: {
      adapter: 'sails-mongo',
      // module: 'sails-mongo',
      host: process.env.MONGO_HOST  || 'koala',
      port: process.env.MONGO_PORT  || 47017,
      user: '',
      password: '',
      database: process.env.MONGO_DBNAME || 'koala'
    },
  },

  defaults: {
    migrate: 'alter'
  }

};
