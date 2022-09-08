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

const update = async (req, res, next) => {
  const post_id = req.params.post_id;
  postsService.findByID(post_id)
  .then(docs => {
    if (docs == null) {
      return res.status(404).json({
        message: "Post ID not found",
      });
    } else {
      const dataUpdate = {
        image: req.body.image,
        image_name: req.body.image_name,
        title: req.body.title,
        description: req.body.description,
      };
      postsService.update(post_id, dataUpdate)
      .then(update => {
        if (update) {
          res.status(200).json({
            message: 'Post updated',
            dataUpdate: dataUpdate,
            request: {
              type: "PUT",
              url: "/posts/update" + post_id,
            },
          });
        } else {
          throw {
            name: "Validation_error",
            statusCode: 404,
            message: `Post with id: ${post_id} is not found`,
          };
        }
      })
      .catch(err => {
        next(err);
      })
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
  update,
};
