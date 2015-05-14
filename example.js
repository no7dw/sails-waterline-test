/**
 * A simple example of how to use Waterline v0.10 with Express
 */

var express = require('express'),
    _ = require('lodash'),
    app = express(),
    Waterline = require('waterline'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override');



// Instantiate a new instance of the ORM
var orm = new Waterline();


//////////////////////////////////////////////////////////////////
// WATERLINE CONFIG
//////////////////////////////////////////////////////////////////

// Require any waterline compatible adapters here
// var diskAdapter = require('sails-disk');
// var mysqlAdapter = require('sails-mysql');
var mongoAdapter = require('sails-mongo');

// Build A Config Object
var config = {

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


//////////////////////////////////////////////////////////////////
// WATERLINE MODELS
//////////////////////////////////////////////////////////////////

var User = Waterline.Collection.extend({

  identity: 'User',
  connection: 'devMongodb',

  attributes: {

    username : { type: 'string' },

    password : { type: 'string' },

    real_name : { type: 'string' },

    encrypted_password: {type: 'string'},

    pay_password : { type: 'string' },

    id_card : { type: 'string' },

    is_verify : { type : 'boolean' } ,

    email : { type: 'string' },

    phone : { type: 'string'},

    // 从哪里注册的
    created_from: { type: 'string'},

    //date:{type: 'integer'}
    //num :{type: 'integer'}
    //国政通的身份认证的时间记录
    verify_data: {type: 'array'},
    //user的状态:1 enble  0 disable
    status : { type : 'integer' },

    toJSON: function() {
      var obj = this.toObject();
      delete obj.encrypted_password;
      return obj;
    }
  }
});

var Portfolio_provide = Waterline.Collection.extend({

  identity: 'Portfolio_provide',
  connection: 'devMongodb',

  attributes: {
    portfolio_id:{ type : 'string' },
    //今天发放份数
    t_provide_num:{ type : 'integer' },
    //剩余份数
    a_provide_num:{ type : 'integer' },
    back_num: { type : 'integer' },
    //限制额度
    quota: {type: 'integer'},
    provide_time : { type: 'integer' },
    createAt : { type : 'integer' },
    //事务Id
    transactions_ids:{type:'array'},
    //明日新增份额
    add_provide_num:{ type : 'integer'}
  }
});


// Load the Models into the ORM
orm.loadCollection(User);
orm.loadCollection(Portfolio_provide);



//////////////////////////////////////////////////////////////////
// EXPRESS SETUP
//////////////////////////////////////////////////////////////////


// Setup Express Application
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Build Express Routes (CRUD routes for /users)

app.get('/users', function(req, res) {
  app.models.User.find().exec(function(err, models) {
    if(err) return res.json({ err: err }, 500);
    res.json(models);
  });
});

app.post('/users', function(req, res) {
  app.models.User.create(req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});

app.get('/users/:id', function(req, res) {
  app.models.User.findOne({ id: req.params.id }, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});

app.delete('/users/:id', function(req, res) {
  app.models.User.destroy({ id: req.params.id }, function(err) {
    if(err) return res.json({ err: err }, 500);
    res.json({ status: 'ok' });
  });
});

app.put('/users/:id', function(req, res) {
  // Don't pass ID to update
  delete req.body.id;

  app.models.User.update({ id: req.params.id }, req.body, function(err, model) {
    if(err) return res.json({ err: err }, 500);
    res.json(model);
  });
});



//////////////////////////////////////////////////////////////////
// START WATERLINE
//////////////////////////////////////////////////////////////////

// Start Waterline passing adapters in
orm.initialize(config, function(err, models) {
  if(err) throw err;

  app.models = models.collections;
  app.connections = models.connections;

  // Start Server
  app.listen(3000);
  
  console.log("To see saved users, visit http://localhost:3000/users");
});