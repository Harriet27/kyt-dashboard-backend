const commentsService = require("../services/commentsService");

const getAll = async (req, res, next) => {
  commentsService.getAll()
  .then((docs) => {
    return res.status(200).json({
      message: "Success!",
      total: docs.data.length,
      data: docs.data[0],
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: err,
      message: "data getting Failed",
    });
  })
};

const getByID = async (req, res, next) => {
  const {
    comment_id,
  } = req.params;
  commentsService.getByID(comment_id)
  .then((docs) => {
    return res.status(200).json({
      message: "Success!",
      total: docs.data.length,
      data: docs.data[0][0],
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: err,
      message: "data getting Failed",
    });
  })
};

const getPostComment = async (req, res, next) => {
  commentsService.getPostComment(req)
  .then((docs) => {
    return res.status(200).json({
      message: "Success!",
      total_comments: docs.data[0].length,
      comments: docs.data[0],
    });
  })
  .catch((err) => {
    res.status(500).json({
      status: err,
      message: "data Getting Failed",
    });
  })
};

module.exports = {
  getAll,
  getByID,
  getPostComment,
};
