const express = require("express");
const apiRouter = require("./routers");
const errorHandler = require("./utils/errorHandler");

const app = express();


app.use(express.json());


app.get("/", (req, res) => res.send({ message: "Hello" }));


app.use("/api", apiRouter);


app.use(errorHandler);


module.exports = app;