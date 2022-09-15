const commentsService = require("../services/commentsService");
const axios = require("axios");

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

const getPostCommentOld = async (req, res, next) => {
  commentsService.getPostComment(req)
  .then((docs) => {
    const commentsData = docs.data[0];
    return res.status(200).json({
      message: "Success!",
      total_comments: commentsData.length,
      comments: commentsData,
    });
  })
  .catch((err) => {
    console.log("err", err);
    return res.status(500).json({
      status: err,
      message: "data Getting Failed",
    });
  })
};

const getPostCommentNew = async (req, res, next) => {
  commentsService.getPostComment(req)
  .then(async (docs) => {
    const commentsData = docs.data[0];
    const body = {
      data: commentsData.map(item => item.comment),
    };
    const options = {
      headers: {
        "Authorization": `Token ${process.env.MONKEYLEARN_API_KEY}`,
      },
    };
    try {
      const response = await axios.post(
        `https://api.monkeylearn.com/v3/classifiers/${process.env.MONKEYLEARN_MODEL_ID_SA}/classify/`,
        body,
        options
      );
      var analysis = response.data.map(item => {
        return item.classifications.map(({ tag_name, confidence }) => {
          return { tag_name, confidence };
        });
      });
      const flatAnalysis = analysis.flat();
      const commentWithAnalysis = commentsData.map((val, i) => {
        return Object.assign({}, val, flatAnalysis[i]);
      });
      return res.status(200).send({
        message: "Success!",
        total_comments: commentsData.length,
        comments: commentWithAnalysis,
      });
    } catch (err) {
      console.log("err", err);
      return res.status(500).send(err);
    }
  })
  .catch((err) => {
    return res.status(500).json({
      status: err,
      message: "data Getting Failed",
    });
  })
};

const create = (req, res, next) => {
  const data = {
    name: req.body.name,
    comment: req.body.comment,
    date: new Date(),
    like: req.body.like,
    dislike: req.body.dislike,
    post_id: req.body.post_id,
  };
  commentsService.create(data)
  .then((result) => {
    const response = {
      status: "Success",
      message: "Successfully create comment",
      results: result,
      request: {
        type: "POST",
        url: "/comments/create",
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
  getAll,
  getByID,
  getPostCommentNew,
  getPostCommentOld,
  create,
};
