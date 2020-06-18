const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: String,
  log: [{ type: Schema.Types.ObjectId, ref: 'exercises' }],
});

module.exports = mongoose.model('users', UserSchema);
