import Bot from "../src/lib/Bot";
import DataSource from "../src/lib/DataSource";
describe("Bot Tests", () => {
  it("Should exists", () => {
    const bot = new Bot(new DataSource("solusdt", "15m", 500));
    expect(bot).toBeInstanceOf(Bot);
  });
});
