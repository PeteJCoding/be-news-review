const express = require("express");
const apiRouter = require("./routers");
const errors = require("./Error/errorHandler");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(errors);

module.exports = app;