import { afterAll, beforeAll, describe, expect, it } from "vitest";
import app from "../app.js";
import prisma from "../lib/prisma.js";
import request from "supertest";

const agent = request.agent(app);

describe("Invalid login attempt", () => {

    beforeAll(async () => {
        await agent.post("/auth/register")
                    .send({
                        email: "agent@new.com",
                        password: "agentPass1234"
                    });
    });

    it("should fail to log the user in since the password is incorrect", async () => {
        const failResponse = await agent.post("/auth/login")
                                        .send({
                                            email: "agent@new.com",
                                            password: "agentPass1111"
                                        });

        expect(failResponse.status).toBe(401);
    });

    it("should fail to get user data since the user is not logged in", async () => {

        const flResponse = await agent.get("/auth/me");

        expect(flResponse.status).toBe(401);

    })

    afterAll(async () => {

        await prisma.user.delete({
            where: {
                email: "agent@new.com"
            }
        });

        await prisma.$disconnect();

    });

});