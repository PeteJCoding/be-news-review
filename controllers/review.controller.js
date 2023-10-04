const { fetchTopics, fetchApi } = require("../models/review.model")

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
