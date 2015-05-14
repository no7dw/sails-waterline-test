var Waterline = require('waterline');
// var _ = require('underscore');
// var models = require('include-all')({
//   dirname     :  __dirname ,
//   filter      :  /\.js$/,
//   excludeDirs :  /(^\.git|^\.svn|index)$/
// });
// _.each( models, function(model, modelid){
// 	orm.loadCollection(Waterline.Collection.extend(model));
// });

var orm = new Waterline();


var UserModel = require('./User');

//todo use _ to load all
var User = Waterline.Collection.extend(UserModel);

orm.loadCollection(User);

module.exports = orm;