const postsService = require("../services/postsService");

const get = async (req, res, next) => {
  postsService.get()
  .then((docs) => {
    return res.status(200).json({
      message: "Success!",
      total: docs.data.length,
      data: docs.data,
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
