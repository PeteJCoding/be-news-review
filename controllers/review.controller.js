const { fetchTopics, 
    fetchApi, 
    fetchArticleById, 
} = require("../models/review.model");

exports.getTopics = async (req, res, next) => {
    fetchTopics().then((topics) => {
            res.status(200).send({ topics });
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};

exports.getApi = (req, res, next) => {
    fetchApi().then((result) => {
            res.status(200).send({ endPointData: result });
        })
        .catch((error) => {
            console.error("Error fetching API data:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

exports.getArticleById = async (req, res, next) => {
    const { article_id: id } = req.params;
  
    fetchArticleById(id)
      .then((article) => {
        res.status(200).send({ article });
      })
      .catch((err) => next(err));
  };

