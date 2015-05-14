
module.exports = {

  identity: 'user',
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
};
