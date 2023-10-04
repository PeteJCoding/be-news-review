const db = require("../db/connection");
const fs = require("fs").promises;


exports.fetchTopics = async () => {
    return db.query("SELECT * FROM topics;").then((result) => {
        return result.rows;
    })
    .catch((error) => {
        throw error;
    });
};

exports.fetchApi = async () => {
    return fs.readFile("./endpoints.json", "utf-8").then((data) => {
        const parsedData = JSON.parse(data);
        return parsedData;
    })
   
};



