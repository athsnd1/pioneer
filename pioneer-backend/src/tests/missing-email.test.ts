import { describe, expect, it } from "vitest";
import app from "../app.js";
import request from "supertest";

describe("POST /auth/register", () => { 
    
    it("tries to register a user with missing email", async () => {

        const response = await request(app)
                        .post("/auth/register")
                        .send({
                            email: "some@email.com"
                        });
                    
        console.log(response.status);
        console.log(response.body);

        expect(response.status).toBe(400);
        expect(response.body.message).toBe("Email and password are required");

    });

});