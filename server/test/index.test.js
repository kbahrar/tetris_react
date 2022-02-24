const request = require("supertest");
const { server } = require('../index');

describe("Test the root path", () => {
    afterAll(() => {
        server.close()
    });

    test("It should response the GET method", () => {
        return request('http://localhost:5000')
            .get("/")
            .then(response => {
                expect(response.statusCode).toBe(200);
                expect(response.header).toHaveProperty('content-type', 'text/html; charset=UTF-8');
            });
    });

    test("It should response with status 301 redirect to /", () => {
        return request('http://localhost:5000')
            .get("/hello")
            .then(response => {
                expect(response.statusCode).toBe(301);
            });
    });
});