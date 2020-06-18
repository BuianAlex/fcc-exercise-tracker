const UserQuery = require('./userScheme');

const createUser = (name) =>{
  const user = new  UserQuery({username: name});
  return user.save();   
}

module.exports = {createUser};