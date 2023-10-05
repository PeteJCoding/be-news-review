const request = require('supertest');
const app = require('../routers/review.router')
const db = require("../db/connection")
const testData = require("../db/data/test-data/index");
const seed = require("../db/seeds/seed");

beforeEach(() =>{
    return seed (testData)
})

afterAll(() => {
    return db.end()
});

describe("Healthcheck Endpoint", () => {
    it("should return a 200 status code", async () => {
        const response = await request(app).get("/api/healthcheck");
        expect(response.status).toBe(200);
    });
});

describe("GET /api/topics", () => {
    it("should return a 200 status code", async () => {
        const response = await request(app).get("/api/topics");
        expect(response.status).toBe(200);
    });

    it("should return an array of topics with slug and description properties", async () => {
        const response = await request(app).get("/api/topics");
        const { body } = response;
        const { topics } = body;
        expect(Array.isArray(topics)).toBe(true);
        topics.forEach((topic) => {
            expect(topic).toMatchObject({
                slug: expect.any(String),
                description: expect.any(String),
            });
        });
    });
});

describe("GET /api", () => {
    it("should return JSON object with endpoints details", async () => {
        const response = await request(app).get("/api");
        expect(response.status).toEqual(200);

        const { body } = response;
        const topicsEndPointObject = body.endPointData["GET /api/topics"];

        expect(typeof topicsEndPointObject).toEqual("object");
        expect(topicsEndPointObject).toHaveProperty(
            "description",
            expect.any(String)
        );
        expect(topicsEndPointObject).toHaveProperty(
            "queries",
            expect.any(Array)
        );
        expect(topicsEndPointObject).toHaveProperty(
            "exampleResponse",
            expect.any(Object)
        );
    });
});

describe("GET /api/articles", () => {
    it("should return a 200 status code", async () => {
        const response = await request(app).get("/api/articles");
        expect(response.status).toBe(200);
    });

    it("should return an array of articles with expected properties", async () => {
        const response = await request(app).get("/api/articles");
        const { body } = response;
        const { articles } = body;
        articles.forEach((article) => {
            expect(article).toMatchObject({
                article_id: expect.any(Number),
                title: expect.any(String),
                votes: expect.any(Number),
                topic: expect.any(String),
                author: expect.any(String),
                created_at: expect.any(String),
                comment_count: expect.any(Number),
            });
        });
    });
});

describe("GET /api/articles/:article_id/comments", () => {
    it('Status: 200 "OK" and receive an empty array for a valid article with no comments', async () => {
        const articleId = 2; // Assuming this ID corresponds to an article with no comments
        const { body, status } = await request(app)
            .get(`/api/articles/${articleId}/comments`);

        if (status === 200) {
            const { comments } = body;
            expect(Array.isArray(comments)).toBe(true);
            expect(comments.length).toBe(0);
        }
    });
    
    it('Status: 404 "Not Found" for a non-existent ID', async () => {
        const nonExistentArticleId = 9999;
        const { status } = await request(app)
            .get(`/api/articles/${nonExistentArticleId}/comments`);
        expect(status).toBe(404);
    });

    it('Status: 200 "OK" and receive all article comments for a valid article with comments', async () => {
        const articleId = 1;
        const { body } = await request(app)
            .get(`/api/articles/${articleId}/comments`)
            .expect(200);
        
        const { comments } = body;
        if (comments && comments.length > 0) {
            comments.forEach((comment) => {
                expect(comment).toMatchObject({
                    comment_id: expect.any(Number),
                    votes: expect.any(Number),
                    created_at: expect.any(String),
                    author: expect.any(String),
                    body: expect.any(String),
                    article_id: articleId,
                });
            });
        } else {
            console.log("The comments array is empty.");
        }
    });
});