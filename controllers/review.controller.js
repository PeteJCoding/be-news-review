const { fetchTopics, 
    fetchApi, 
    fetchArticleById, 
    fetchAllArticles,
    fetchArticleComments,
    
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

  exports.getAllArticles = async (req, res, next) => {
    fetchAllArticles()
      .then((articles) => {
        res.status(200).send({ articles });
      })
      .catch((err) => {
        next(err);
      });
  };

  exports.getArticleComments = (req, res, next) => {
    const { article_id: id } = req.params;
    
    fetchArticleComments(id)
      .then((comments) => {
        res.status(200).send({ comments });
      })
      .catch((err) => next(err));
  };
  


