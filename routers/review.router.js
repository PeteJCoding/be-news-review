const express = require('express');
const { getTopics } = require("../controllers/review.controller")
const app = express();

app.get("/api/healthcheck", (req, res) => {
    res.status(200).send()
})

app.get("/api/topics", getTopics);


module.exports = app;
