import Bot from "../src/lib/Bot";
describe("Bot Tests", () => {
  it("Should exists", () => {
    const bot = new Bot();
    expect(bot).toBeInstanceOf(Bot);
  });
});
