const { Op } = require("sequelize");
const { Posts } = require("../sequelize");

const get = () => {
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

const update = async (id, data) => {
  return Posts.update(data, {
    where: {
      post_id: id,
    }
  })
  .then((docs) => {
    return {
      data: docs,
    };
  })
  .catch(err => {
    return err;
  })
};

const deleteById = (id) => {
  return Posts.destroy({
    where: {
      post_id: id,
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

const findByID = (id) => {
  return Posts.findOne({
    where: {
      post_id: id,
    },
  })
  .then((docs) => {
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
  getByID,
  create,
  update,
  deleteById,
  findByID
};
