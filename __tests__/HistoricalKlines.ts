import HistoricalKlines from "../src/lib/HistoricalKlines";
describe("HistoricalKlines Tests", () => {
  it("Should exists", () => {
    const obj = new HistoricalKlines(
      "SOLUSDT",
      "15m",
      new Date("2022-01-01"),
      new Date("2022-01-02")
    );
    expect(obj).toBeInstanceOf(HistoricalKlines);
  });
});
