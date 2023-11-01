const { User, Post, Comment } = require('../models');
const userData = require('./userData.json'); // Import user data
const postData = require('./postData.json'); // Import post data
const commentData = require('./commentData.json'); // Import comment data

const seedDatabase = async () => {
  await User.bulkCreate(userData, {
    individualHooks: true, 
  });

  await Post.bulkCreate(postData); 
  await Comment.bulkCreate(commentData); 
};

seedDatabase();