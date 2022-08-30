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

const getByID = async (req, res, next) => {
  const post_id = req.params.post_id;
  postsService.getByID(post_id)
  .then((docs) => {
    return res.status(200).json(docs.data);
  })
  .catch((err) => {
    res.status(500).json({
      status: err,
      message: "data Getting Failed",
    });
  })
};

const create = async (req, res, next) => {
  const data = {
    image: req.body.image,
    image_name: req.body.image_name,
    title: req.body.title,
    description: req.body.description,
  };
  postsService.create(data)
  .then((result) => {
    const response = {
      status: "Success",
      message: "Successfully create post",
      results: result,
      request: {
        type: "POST",
        url: "/posts/create",
      },
    };
    if (result) {
      res.status(200).json(response);
    } else {
      res.status(404).json({
        message: `id not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).json({
      error: err,
    });
  })
};

module.exports = {
  get,
  getByID,
  create,
};
