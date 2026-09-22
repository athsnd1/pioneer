import { formatDate } from "../utils/formatDate";
import { describe, expect, it } from "vitest";

describe("formatDate", () => {

    it("Formats a date string to return another string in the format: dd/mm/yy", () => {
        expect(formatDate("2022-08-14")).toBe("14/08/22");
    });

});