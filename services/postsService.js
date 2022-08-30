const { Posts } = require("../sequelize");

const get = (req) => {
  return Posts.findAll()
  .then((docs) => {
    return {
      data: docs,
    };
  })
  .catch((err) => {
    return err;
  })
};

const getByID = (req) => {
  return Posts.findOne({
    where: {
      post_id: req,
    },
  })
  .then((docs) => {
    return {
      data: docs,
    };
  })
  .catch((err) => {
    return err;
  })
};

const create = (data) => {
  return Posts.create(data)
  .then((docs) => {
    return {
      data: docs,
    };
  })
  .catch((err) => {
    return err;
  })
};

module.exports = {
  get,
  getByID,
  create,
};
