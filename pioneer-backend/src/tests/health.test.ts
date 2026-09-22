import { describe, it, expect } from "vitest";
import app from "../app.js";
import request from "supertest"

describe("GET /health", () => {

    it("tests that the server is running", async () => {

        const response = await request(app).get("/health");

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            status: "OK",
            message: "Pioneer backend is running"
        })

    });

});