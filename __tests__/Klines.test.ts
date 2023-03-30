import Klines from "../src/lib/Klines";
describe("Klines Tests", () => {
  it("Should exists", () => {
    const obj = new Klines(5);
    expect(obj).toBeInstanceOf(Klines);
  });
});
