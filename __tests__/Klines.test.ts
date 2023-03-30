import Kline from "../src/lib/Kline";
import Klines from "../src/lib/Klines";

describe("Klines Tests", () => {
  it("Should exists", () => {
    const obj = new Klines(3);
    expect(obj).toBeInstanceOf(Klines);
  });

  it("It must not have the amount of elements greater than the limits.", () => {
    const obj = new Klines(3);
    let kline = new Kline([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
    expect(obj.getCloses().length).toEqual(0);
    obj.addKline(kline);
    expect(obj.getCloses().length).toEqual(1);
    obj.addKline(kline);
    expect(obj.getCloses().length).toEqual(2);
    obj.addKline(kline);
    expect(obj.getCloses().length).toEqual(3);
    obj.addKline(kline);
    expect(obj.getCloses().length).toEqual(3);
  });
});
