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


describe("GET /api/healthcheck", () => {
    test("returns 200 status code", () => {
        return request(app)
        .get("/api/healthcheck")
        .expect(200)
    })
});


describe('GET /api/topics', () => {
    it('responds with a 200 status code', async () => {
        const response = await request(app)
            .get("/api/topics")
            .expect(200);

        const { body } = response;
        expect(body).toBeDefined();
    });

    it('should receive all topics with the expected structure', async () => {
        const response = await request(app)
            .get("/api/topics")
            .expect(200);

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

describe("GET /api/articles/article_id", () => {
test('Status: 200 "OK" on Valid ID', async () => {
      const { body } = await request(app).get("/api/articles/1").expect(200);
      const { article } = body;
      expect(article).toMatchObject({
        article_id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
        votes: expect.any(Number),
        topic: expect.any(String),
        author: expect.any(String),
        created_at: expect.any(String),
        article_img_url: expect.any(String),
        
      });
    });
  });

  describe("GET /api/articles", () => {
    it('Status: 200 "OK" and recieve all articles', async () => {
        const { body } = await request(app).get("/api/articles").expect(200);
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
  })