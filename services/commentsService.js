const { Op } = require("sequelize");
const { Comments } = require("../sequelize");

const get = (req) => {
  const query = `
    select * from comments
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
  get,
};
