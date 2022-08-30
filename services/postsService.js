const { Posts } = require("../sequelize");

const get = (req) => {
  return Posts.findAll()
  .then(docs => {
    return {
      data: docs,
    };
  })
  .catch(err => {
    return err;
  })
};

module.exports = {
  get,
};
