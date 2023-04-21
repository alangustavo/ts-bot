import BinanceHistoricalKlines from "../src/lib/BinanceHistoricalKlines";

process.env.DATABASE_URL = "./data/test.db";
describe("HistoricalKlines Tests", () => {
  it("Should exists", async () => {
    const obj = new BinanceHistoricalKlines(
      "SOLUSDT",
      "15m",
      new Date("2023-04-01 00:00:00"),
      new Date("2023-04-02 23:45:00")
    );
    expect(obj).toBeInstanceOf(BinanceHistoricalKlines);
    await obj.start();
  });
  it("Must Return Data from a valid range", async () => {
    const obj1 = new BinanceHistoricalKlines(
      "SOLUSDT",
      "15m",
      new Date("2023-04-01 00:00:00"),
      new Date("2023-04-02 23:45:00")
    );
    await obj1.start();
    const obj = new BinanceHistoricalKlines(
      "SOLUSDT",
      "15m",
      new Date("2023-04-01 05:00:00"),
      new Date("2023-04-01 07:00:00")
    );
    // Agora devem existir dados.
    const data = await obj.start();
    expect(data.constructor.name).toEqual("Statement");
  });
  it("Must Return a Statment", async () => {
    const obj = new BinanceHistoricalKlines(
      "SOLUSDT",
      "15m",
      new Date("2023-04-01 00:00:00"),
      new Date("2023-04-02 23:45:00")
    );
    const data = await obj.start();
    expect(data.constructor.name).toEqual("Statement");
    // console.log(data.get());
  });
  it("Must Cover Data out of range of date", async () => {
    const obj = new BinanceHistoricalKlines(
      "SOLUSDT",
      "15m",
      new Date("2017-01-01"),
      new Date("2017-01-02")
    );
    const data = await obj.start();
    expect(data.constructor.name).toEqual("Statement");
  });


});
