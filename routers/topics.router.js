const express = require('express');
const { getTopics } = require("../controllers/topics.controller")
const app = express();

app.get("/api/healthcheck", (req, res) => {
    res.status(200).send()
})

app.get("/api/topics", getTopics);


app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({ message: 'internal server error!'})
})

module.exports = app;
