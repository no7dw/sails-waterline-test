module.exports.models = {
  'connection': 'someMongoDb'
};
module.exports.connections = {

  someMongoDb: {
    adapter: 'sails-mongo',
    url: process.env.MONGOLAB_URI
  }
};
