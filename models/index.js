const Users = require('./Users');
const Posts = require('./Posts');
const Comments = require('./Comments');

Users.hasMany(Posts, {
  foreignKey: 'users_id',
  onDelete: 'CASCADE'
});

Posts.hasMany(Comments, {
    foreignKey: 'users_id',
    onDelete: 'CASCADE'
})

Posts.belongsTo(Users, {
  foreignKey: 'users_id'
});

Comments.belongsTo(Posts, {
    foreignKey: 'posts_id' 
})

module.exports = { Users, Posts, Comments };