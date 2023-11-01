// models/index.js
const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');

// Define associations
Users.hasMany(Posts, {
  foreignKey: 'users_id',
  onDelete: 'CASCADE'
});

Posts.belongsTo(Users, {
  foreignKey: 'users_id'
});

Posts.hasMany(Comments, {
  foreignKey: 'post_id',
  onDelete: 'CASCADE'
});

Comments.belongsTo(Posts, {
  foreignKey: 'post_id'
});

Comments.belongsTo(Users, {
  foreignKey: 'user_id' // Add this association to connect Comments to Users
});

module.exports = { Users, Posts, Comments };
