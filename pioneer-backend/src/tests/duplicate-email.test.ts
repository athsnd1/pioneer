import { describe, expect, it } from "vitest";
import request from "supertest";
import app from "../app.js";

describe("POST /auth/register", () => {

    it("tests that already registered users will not be registered again", async () => {

        const response = await request(app)
                        .post("/auth/register")
                        .send({
                            email: "attahsundayjr@gmail.com",
                            password: "815153$$Athsnd"
                        });

        expect(response.status).toBe(409);
        expect(response.body.message).toBe("Email already exists");

    });

});