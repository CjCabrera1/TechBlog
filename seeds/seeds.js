const { Users, Posts, Comments } = require('../models');
const userData = require('./userData.json'); // Import user data
const postData = require('./postData.json'); // Import post data
const commentData = require('./commentData.json'); // Import comment data

const seedDatabase = async () => {
  await Users.bulkCreate(userData, {
    individualHooks: true, 
  });

  await Posts.bulkCreate(postData); 
  await Comments.bulkCreate(commentData); 
};

seedDatabase();