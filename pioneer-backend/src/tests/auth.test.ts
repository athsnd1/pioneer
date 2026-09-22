import { describe, expect, it, afterEach, afterAll } from "vitest";
import request from "supertest";
import app from "../app.js";
import prisma from "../lib/prisma.js";

describe("POST /auth/register", () => {

    afterEach(async () => {
        await prisma.user.delete({
            where: {
                email: "testmail@example.com"
            },
        });
    });

    afterAll(async () => {
        await prisma.$disconnect();
    });

    it("attempts to create a new user", async () => {

        const response = await request(app)
                        .post("/auth/register")
                        .send({
                            email: "testmail@example.com", 
                            password: "Password1234$$", 
                        });

        console.log("Response status: ", response.status);
        console.log("Response body: ", response.body);

        expect(response.status).toBe(201);
        expect(response.body.message).toEqual("Account created successfully");

    });

});