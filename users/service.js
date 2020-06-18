const UserQuery = require('./userScheme');
const { Promise } = require('mongoose');

const createUser = (name) => {
  const user = new UserQuery({ username: name });
  return user.save();
};

const getAllUsers = () => {
  return new Promise((resolutionFunc, rejectionFunc) => {
    UserQuery.find()
      .then((userList) => resolutionFunc(userList))
      .catch(rejectionFunc);
  });
};

module.exports = { createUser, getAllUsers };
