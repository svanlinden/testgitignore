const request = require("supertest");
const app = require("../app");

describe("Test static page", () => {

    test("GET static page", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    });

});