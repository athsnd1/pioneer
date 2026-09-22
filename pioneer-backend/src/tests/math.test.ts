import { describe, expect, it } from "vitest";
import { add } from "../utils/math.js";

describe("add()", () => {

    it("adds two numbers together", () => {
        expect(add(3, 4)).toBe(7);
    });

});