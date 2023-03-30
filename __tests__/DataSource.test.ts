import DataSource from "../src/lib/DataSource";
describe("DataSource Tests", () => {
  it("Should exists", () => {
    const obj = new DataSource("SOLUSDT", "15m", 500);
    expect(obj).toBeInstanceOf(DataSource);
  });
});
