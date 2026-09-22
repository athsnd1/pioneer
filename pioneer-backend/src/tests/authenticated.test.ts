import { describe, expect, it, beforeAll, afterAll } from "vitest";
import app from "../app.js";
import request from "supertest";
import prisma from "../lib/prisma.js";

const agent = request.agent(app);

describe("Authenticated routes", () => {

    beforeAll(async () => {
        await agent
                .post("/auth/register")
                .send({
                    email: "agent@test.com",
                    password: "agentPass1234"
                });

        await agent
                .post("/auth/login")
                .send({
                    email: "agent@test.com",
                    password: "agentPass1234"
                });
    });

    it("should ensure the user exists", async () => {

        const authResponse = await agent.get("/auth/me");

        expect(authResponse.status).toBe(200);

    });

    afterAll(async () => {
        await prisma.user.delete({
            where: {
                email: "agent@test.com"
            }
        });
    });

});