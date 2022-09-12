const { Op } = require("sequelize");
const { Posts } = require("../sequelize");

const get = (req) => {
  const post_id = req.query.post_id ? `p.post_id = ${req.query.post_id}` : '';
  const whereClause = 
    post_id
    ? `WHERE ${post_id}`
    : '';
  const query = `
    select 
      p.post_id,
      p.image,
      p.image_name,
      p.title,
      p.description,
      c.comment_id,
      c.name as comment_name,
      c.comment as comment_post,
      c.date as comment_date,
      c.like as comment_like,
      c.dislike as comment_dislike 
        from posts p 
        left join comments c on c.comment_id = p.post_id 
          ${whereClause}
  `;
  return Posts.sequelize.query(
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
