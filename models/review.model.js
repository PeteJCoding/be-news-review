const db = require("../db/connection");
const fs = require("fs").promises;

exports.fetchTopics = () => {
  return db.query("SELECT * FROM topics;")
    .then((result) => {
      return result.rows;
    });
};

exports.fetchApi = () => {
  return fs.readFile("./endpoints.json", "utf-8")
    .then((data) => {
      const parsedData = JSON.parse(data);
      return parsedData;
    });
};

exports.fetchArticleById = (id) => {
  return db.query(
    `SELECT 
      articles.*, COUNT(comments.comment_id)::int AS comment_count
    FROM articles
    JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
    [id]
  )
    .then((result) => {
      const rows = result.rows;
      if (rows.length < 1) {
        return Promise.reject({ status: 404, message: "No Article Found" });
      }
      return rows[0];
    });
};

exports.fetchAllArticles = () => {
  let query = `SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, COUNT(comments.article_id)::Int AS comment_count FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id 
    GROUP BY articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes`;
  return db.query(query)
    .then((result) => {
      return result.rows;
    });
};

exports.fetchArticleComments = (id) => {
  return this.fetchArticleById(id)
    .then((article) => {
      if (article.status === 404) return Promise.reject(article);
      return db.query("SELECT * FROM comments Where article_id = $1", [id])
        .then((result) => {
          return result.rows;
        });
    });
};



