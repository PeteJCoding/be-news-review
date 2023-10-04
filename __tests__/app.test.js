const request = require('supertest');
const app = require('../apps/app')
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