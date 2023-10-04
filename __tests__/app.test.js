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