import Bot from "../src/lib/Bot";
import MFIRSI from "../src/indicators/MFIRSI";

describe("Bot Tests", () => {
    it("Should exists", () => {
        const i = new MFIRSI("SOLUSDT", "15m");
        const obj = new Bot(i, new Date("2022-01-01"), new Date("2023-04-01"));
        expect(obj).toBeInstanceOf(Bot);
    });
});