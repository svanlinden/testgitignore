const request = require("supertest");
const app = require("../app");
const url = require("url");

describe("Test Persons", () => {

    test("GET speeldagen", async () => {
        const res = await request(app).get("/api/persons");
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThan(10);

    });

    test("GET persoon", async () => {
        const res = await request(app).get("/api/persons/");
        expect(res.statusCode).toBe(200);
        console.log(res.body[0]._links.self.href);

        const myUrl = new URL(res.body[0]._links.self.href);
        console.log(myUrl.pathname);
        const res1 = await request(app).get(myUrl.pathname);
        expect(res1.body.last_name).toBe("Vertommen");

    });

    test("POST nieuwe persoon", async () => {
        const res = await request(app).post("/api/persons")
            .send({first_name: "Zeppo", birth_day: "18/06/1905"});
        expect(res.statusCode).toBe(201);

    });

});

describe("Test Cars", () => {

    test("GET de juiste cars bij de juiste persoon", async () => {
        const res = await request(app).get("/api/persons/1/cars");
        expect(res.statusCode).toBe(200);
        let laatsteElement = res.body.length - 1;

        const myUrl = new URL(res.body[laatsteElement]._links.self.href);
        console.log(myUrl.pathname);
        const res1 = await request(app).get(myUrl.pathname);
        expect(res1.body.person.last_name).toBe("Vertommen");

    });


});