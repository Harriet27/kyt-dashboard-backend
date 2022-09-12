const { Op } = require("sequelize");
const { Comments } = require("../sequelize");

const getAll = (req) => {
  const query = `
    SELECT * FROM comments
  `;
  return Comments.sequelize.query(
    query,
    {
      type: Op.SELECT,
    }
  )
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
  const query = `
    SELECT * FROM comments WHERE comment_id = ${req}
  `;
  return Comments.sequelize.query(
    query,
    {
      type: Op.SELECT,
    }
  )
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
  getAll,
  getByID,
};
