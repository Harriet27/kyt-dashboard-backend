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

const getPostComment = (req) => {
  const post_id = req.params.post_id ? `p.post_id = ${req.params.post_id}` : '';
  const whereClause = 
    post_id
    ? `WHERE ${post_id}`
    : '';
  const query = `
    select 
      c.comment_id,
      c.name as comment_name,
      c.comment as comment_post,
      c.date as comment_date,
      c.like as comment_like,
      c.dislike as comment_dislike 
        from posts p 
        left join comments c on c.post_id = p.post_id 
          ${whereClause}
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
  getPostComment,
};
