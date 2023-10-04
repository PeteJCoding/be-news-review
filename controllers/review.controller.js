const { fetchTopics } = require("../models/review.model")

exports.getTopics = async (req, res, next) => {
    fetchTopics().then((topics) => {
            res.status(200).send({ topics });
        })
        .catch((error) => {
            res.status(500).send(error);
        });
};
