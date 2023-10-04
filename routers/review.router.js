const express = require('express');
const { getTopics, getApi } = require("../controllers/review.controller");

const app = express();

app.get("/api/healthcheck", (req, res) => {
    res.status(200).send()
})

app.get("/api/topics", getTopics);

app.get("/api", getApi);


module.exports = app;
