var Waterline = require('waterline');
var UserModel = require('./User');

//todo use _ to load all
var User = Waterline.Collection.extend(UserModel);


var orm = new Waterline();

orm.loadCollection(User);

module.exports = orm;