const express = require("express");
const apiRouter = require("./routers");
const app = express();
app.use(express.json());
app.use("/api", apiRouter);

app.use((err, req, res, next) => {
    console.log(err)
    res.status(500).send({message: 'internal server error!'})
})



module.exports = app;