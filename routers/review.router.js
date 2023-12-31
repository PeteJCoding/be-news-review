const express = require('express');
const { getTopics, getApi, getArticleById, getAllArticles, } = require("../controllers/review.controller");

const app = express();

app.get("/api/healthcheck", (req, res) => {
    res.status(200).send()
})

app.get("/api/topics", getTopics);

app.get("/api", getApi);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles", getAllArticles);



module.exports = app;
