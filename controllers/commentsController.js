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

/*
const getPostComment = async (req, res, next) => {
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
    res.status(500).json({
      status: err,
      message: "data Getting Failed",
    });
  })
};
*/

const getPostComment = async (req, res, next) => {
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
        })
      });
      const flatAnalysis = analysis.flat();
      return res.status(200).send({
        message: "Success!",
        total_comments: commentsData.length,
        comments: commentsData,
        analysis: flatAnalysis,
      });
    } catch (err) {
      console.log("err", err);
      return res.status(500).send(err);
    }
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
