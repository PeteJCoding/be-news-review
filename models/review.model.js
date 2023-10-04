const db = require("../db/connection");

exports.fetchTopics = async () => {
    return db.query("SELECT * FROM topics;").then((result) => {
        return result.rows;
    })
    .catch((error) => {
        throw error;
    });
}



