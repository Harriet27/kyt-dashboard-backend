const commentsService = require("../services/commentsService");

const get = async (req, res, next) => {
  commentsService.get()
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
      message: "data Getting Failed",
    });
  })
};

module.exports = {
  get,
};
