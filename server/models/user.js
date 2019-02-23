const {Storage} = require('./storage.js');
const mongoose = require('mongoose');



const Schema = mongoose.Schema;


const UserSchema = new Schema({
  login: {type: String, required: true, unique: true },
  passhash: {type: String},
  fullname: {type: String, default: "None" },
  date: {type: Date, default: Date.now },
  ava_url: {type: String, required: true },
  description: {type: String, default: "None" },
  googleId: {type: String },
});
UserSchema.statics.findOrCreate = function findOrCreate(condition, callback) {
  const self = this
  self.findOne(condition, (err, result) => {
      return result ? callback(err, result) : self.create(condition, (err, result) => { return callback(err, result) })
  })
}
const UserModel = mongoose.model('User', UserSchema);


class User extends Storage{
  

  static this_model(){
    return UserModel;
  }

  static isValidLogin(login){
    let curr_model = this.this_model()
    return curr_model.find({login: login})
        .then(x => {
            if(x.length == 0) return Promise.resolve();
            else return Promise.reject(
            new Error("Invalid login"));
        });
}

  static insert(ent){
    if(!this.check_params(ent)) 
        return Promise.reject(new Error("Invalid argument"))
    let newUser = new UserModel(ent);
    console.log(newUser._id);
    return newUser.save()
    .then(x => x._id);
  }
  static findOrCreate(...params ){
    return UserModel.findOrCreate(params);
  }

  static check_params(x) {
    return typeof x.login === 'string'
        && typeof x.description === 'string'
        && typeof x.fullname === 'string'
        && typeof x.ava_url === 'string'
  }

  static getByLogin(login){
    if(!valid_string(login))
      return Promise.reject(new Error(`Invalid in getByLogin(${login}) arguments`));
  return this.this_model().findOne({ login : login});
  }


  static getByLoginAndHashPass(login, hashedPass){
    if(!valid_string(login) || !valid_string(hashedPass))
      return Promise.reject(new Error(`Invalid in getByLoginAndHashPass(${login}, ${hashedPass}) arguments`));
  return this.this_model().findOne({ login : login, passhash: hashedPass});
  }

  constructor(login,passhash, fullname, ava_url, description,googleId=null, date= new Date().toISOString()) {
    super();
    this.passhash = passhash;
    this.login = login;  // string
    this.fullname = fullname;  // string
    this.date = date; // string
    this.ava_url = ava_url; // string
    this.description = description //string
    this.googleId = googleId;
   }
};

function valid_number(num) {
  return typeof num === 'number'
      && !isNaN(num);
}

function valid_string(str){
  return typeof str === 'string'
  && str.length != 0;
}


module.exports = {User};