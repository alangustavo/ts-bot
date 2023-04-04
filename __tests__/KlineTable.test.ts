import KlineTable from "../src/lib/KlineTable";
describe("KlineTable Tests", () => {
  it("Should exists", () => {
    const obj = new KlineTable("SOLUSDT_15m");
    expect(obj).toBeInstanceOf(KlineTable);
  });
});
