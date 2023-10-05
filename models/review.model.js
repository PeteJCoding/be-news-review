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

exports.fetchArticleById = async (id) => {
  try {
    const { rows } = await db.query(
      `SELECT 
      articles.*, COUNT(comments.comment_id)::int AS comment_count
    FROM articles
    JOIN comments 
    ON articles.article_id = comments.article_id
    WHERE articles.article_id = $1
    GROUP BY articles.article_id;`,
      [id]
    );
    if (rows.length < 1) {
      return Promise.reject({ status: 404, message: "No Article Found" });
    }
    return rows[0];
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.fetchAllArticles = async () => {
 try {
    let query = `SELECT articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes, COUNT(comments.article_id)::Int AS comment_count FROM articles
    LEFT JOIN comments ON articles.article_id = comments.article_id 
    GROUP BY articles.article_id, articles.title, articles.author, articles.topic, articles.created_at, articles.votes`;
    const { rows } = await db.query(query);
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};

exports.fetchArticleComments = async (id) => {
  try {
    const article = await this.fetchArticleById(id);
    if (article.status === 404) return Promise.reject(article);
    const { rows } = await db.query(
      "SELECT * FROM comments Where article_id = $1",
      [id]
    );
    return rows;
  } catch (error) {
    return Promise.reject(error);
  }
};



